const {Sequelize} = require('sequelize');
const uuid = require('uuid');
const path = require('path');

const repository = require('../database/repository');
const { responseWithError }= require('../helpers/ErrorHelper');

const { 
    Product, 
    ProductType, 
    ProductCategory, 
    FilterItem,
    FilterOption,
    ProductCharItem,
    ProductCharGroup,
    CharValue
} = repository.models;

class ProductController{
    async createProduct(req, res){
        try{
            for(let param in ['name', 'price', 'description', 'typeCode', 'salerId']){
                if(!req.body[param]) 
                    return responseWithError(res, 400, `Parameter ${param} cannot be empty`);
            }

            const {name, price, description, typeCode, salerId} = req.body;
            const {img} = req.files;

            const productType = await ProductType.findOne({where: {code: typeCode}});

            if(!productType) 
                return responseWithError(res, 400, `Product type with code ${typeCode} was not found`);

            const saler = await Saler.findOne({where: {id:salerId}});

            if(!saler)
                return responseWithError(res, 400, `Saler with id ${salerId} was not found`);

            let fileName;

            if(img){
                fileName = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, '..', 'static/photos', fileName));
            }
            
            const newProduct = Product.create({
                name, 
                uuid: uuid.v4(),
                price, 
                description, 
                productTypeId: productType.id, 
                img:fileName 
            });

            return res.status(201).json({
                product: {
                    id: newProduct.id,
                    name: newProduct.name,
                    price: newProduct.price,
                    description: newProduct.description,
                    rating: newProduct.rating,
                    img: newProduct.img,
                    salerId: saler.id,
                    salerName: saler.name,
                    salerRating: saler.rating
                },
                message: 'Product was created successfuly'
            });
        }
        catch(e){
            console.error(e);
            return responseWithError(res, 400, 'Something went wrong during product creation');
        }
    }

    async removeProduct(req, res)
    {
        const { id } = req.body;

        if(!id) 
            return responseWithError(res, 400, 'Id parameter cannot be empty');

        const product = await Product.findOne({
            where: {
                uuid: id
            }
        });

        if(!product) 
            return responseWithError(res, 400, `Product with id ${id} was not found`);

        await product.destroy();

        return res.json({message: 'Product was successfuly destroyed'});
    }

    async getProduct(req, res){
        let {id} = req.params;

        if(!id)
            return responseWithError(res, 400, 'Id parameter cannot be empty');

        let product = await Product.findOne({
            include: [{
                association: 'saler',
                attributes: ['id', 'name', 'rating']
            },{
                association: 'product_type',
                attributes: ['id', 'code']
            }],
            where: {uuid: id}
        });

        if(!product)
            return responseWithError(res, 404, 'Product was not found');

        let charGroups = await ProductCharGroup.findAll({
            attributes: ['id', 'label', 'order'],
            where: {
                productTypeId: product.product_type.id
            }, 
            orderBy: 'order'
        });

        let chars = await ProductCharItem.findAll({
            include:[{
                model: CharValue,
                attributes: ['textValue', 'numValue'],
                required:false,
                where: {
                    productId: product.id
                },
            },{
                association: 'char_item_type',
                attributes: ['code']
            }],
            where: {
                productTypeId: product.product_type.id
            },
            orderBy: 'order'
        });

        let responseChars = [];

        for(let group of charGroups){
            let groupItem = {
                label: group.label,
                order: group.order,
                items: []
            };

            for(let item of chars.filter(i => i.productCharGroupId === group.id)){
                const type = item.char_item_type.code;
                const charValueRec = item.char_values[0];

                let value = null;
                if(charValueRec){
                    switch(type){
                        case 'number':
                            value = charValueRec.numValue;
                            break;
                        case 'option':
                            let filterOption = await FilterOption.findOne({
                                where: {
                                    filterItemId: item.filterItemId,
                                    code: charValueRec.textValue
                                }
                            });
                            value = filterOption.label;
                            break;
                        default:
                            value = charValueRec.textValue;
                            break;
                    }
                }

                groupItem.items.push({
                    label: item.label,
                    order: item.order,
                    suffix: item.suffix,
                    type: type,
                    value: value ?? ''
                });
            }

            responseChars.push(groupItem);
        }

        return res.json({
            id: product.uuid,
            name: product.name,
            price: product.price,
            description: product.description,
            rating: product.rating,
            img: product.img,
            salerId: product.saler.id,
            salerName: product.saler.name,
            salerRating: product.saler.rating,
            chars: responseChars
        });
    }

    async searchProducts(req, res) {
        let page = req.query.page,
            limit = req.query.limit,
            searchValue = req.query.searchValue;

        let resData = await repository.searchProducts(searchValue, page, limit);

        return res.json(resData);
    }

    async getFilteredProducts(req, res){
        const productTypeCode = req.params.productType;

        if(!productTypeCode)
            return responseWithError(res, 400, 'Product type cannot be empty');

        const productType = await ProductType.findOne({
            attributes: ['id'],
            where: { code: productTypeCode }
        });

        if(!productType?.id)
            return responseWithError(res, 400, `Product type with code ${productTypeCode} was not found`);

        let page = req.query.page,
            limit = req.query.limit;

        let filterMap = new Map();

        for(let param in req.query){
            if(['limit', 'page'].includes(param)) continue;

            filterMap.set(param, req.query[param]);
        }

        let resData = await repository.getFilteredProducts(productType.id, filterMap, page, limit);

        return res.json(resData);
    }

    async getFilterOptions(req, res)
    {
        const id = req.params.id;

        if(!id)
            return responseWithError(res, 400, 'Id parameter cannot be empty');

        const filterOptions = await FilterOption.findAll({
            where: {
                filterItemId: id
            }
        });

        return res.json(filterOptions);
    }

    async createType(req, res){
        try{
            const { name, code } = req.body;
            const { icon } = req.files;

            if(!name)
                return responseWithError(res, 400, 'Name parameter cannot be empty');

            const existingType = await ProductType.findOne({
                where: {
                    code
                }
            });

            if(existingType)
                return responseWithError(res, 400, `Type with ${code} code already exists`);

            let fileName;

            if(img){
                fileName = `type-${code}.jpg`;
                img.mv(path.resolve(__dirname, '..', 'static/icons', fileName));
            }

            const maxOrder = await ProductType.max('order');

            const newType = await ProductType.create({
                name,
                code,
                icon: fileName,
                order: maxOrder + 1
            });

            return res.status(201).json({
                type: newType,
                message: 'Type was created successfuly'
            })
        }
        catch(e){
            console.error(e);
            return responseWithError(res, 400, 'Something went wrong during type creation');
        }
    }

    async removeType(req, res){
        const { code } = req.body;

        if(!code)
            return responseWithError(res, 400, 'Code parameter cannot be empty');

        const type = await ProductType.findOne({
            where: {
                code
            }
        });

        if(!type)
            return responseWithError(res, 400, `Type with code ${code} was not found`);

        type.destroy();

        return res.json({message: 'Type was deleted successfuly'});
    }

    async getType(req, res){
        let {code} = req.params;

        if(!code)
            return responseWithError(res, 400, 'Code parameter cannot be empty');

        let productType = await ProductType.findOne({where: {code}});

        if(!productType)
            return responseWithError(res, 400, `Product type with code ${productType} was not found`);

        let filters = await FilterItem.findAll({
            attributes: ['id', 'label', 'code', 'order', 'props'],
            where: {productTypeId: productType.id},
            orderBy: 'order',
            include: [{
                attributes: ['code'],
                association: 'char_item_type',
            }]
        });

        return res.json({
            id: productType.id,
            code: productType.code,
            name: productType.name,
            icon: productType.icon,
            filters: filters.map((rec, key) => {
                return {
                    id: rec.id,
                    code: rec.code,
                    label: rec.label,
                    order: rec.order,
                    type: rec.char_item_type.code
                };
            })
        });
    }

    async getTypes(req, res) {
        let {limit, page} = req.query;

        page = page || 1;
        limit = limit || 20;

        const offset = page * limit - limit;

        let productTypes = await ProductType.findAndCountAll({
            limit, 
            offset,
            order: [
                ['order', 'ASC'],
            ]
        });

        const rows = productTypes.rows.map((rec, index) => {
            return {
                id: rec.id,
                code: rec.code,
                name: rec.name,
                icon: rec.icon
            };
        });

        return res.json({
            count: productTypes.count,
            rows: rows
        });
    }

    async createCategory(req, resp, next){
        try{
            const {name, img, filter} = req.body;

            if(!name)
                return responseWithError(res, 400, 'Name parameter cannot be empty');

            const newCategory = ProductCategory.create({
                uuid: uuid.v4(),
                name,
                img,
                filter
            });

            return res.status(201).json({
                category: newCategory,
                message: 'Category was created successfuly'
            })
        }
        catch(e){
            console.error(e);
            return responseWithError(res, 400, 'Something went wrong during category creation');
        }
    }

    async getCategory(req, res) {
        let {id} = req.params;

        if(!id)
            return responseWithError(res, 400, 'Id parameter cannot be empty');

        let category = await ProductCategory.findOne({where: {id}});

        return res.json({
            id: category.id,
            uuid: category.uuid,
            name: category.name,
            img: category.img,
            popularity: category.popularity,
            filter: category.filter
        });
    }

    async getCategories(req, res) {
        let {limit, page, typeCode, orderBy} = req.query;
        page = page || 1;
        limit = limit || 10;

        const offset = page * limit - limit;
        let where = {};

        if(typeCode){
            const productType = await ProductType.findOne({
                attributes: ['id'],
                where: {code: typeCode}
            });

            if(!productType.id)
                return responseWithError(res, 400, `Product type with code ${typeCode} was not found`);

            where = {...where, productTypeId: productType.id};
        }

        orderBy = orderBy ?? [['popularity', 'DESC']]
        
        const types = await ProductCategory.findAndCountAll({
            limit, 
            offset,
            where,
            order: orderBy,
            include: [{
                attributes: ['id', 'name', 'code'],
                association: 'product_type'
            }]
        });

        return res.json(types);
    }
}

module.exports = new ProductController();