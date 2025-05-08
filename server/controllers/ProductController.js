const {Sequelize} = require('sequelize');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

const repository = require('../database/repository');

const { 
    Product, 
    ProductType, 
    ProductCategory, 
    ProductCharItem,
    FilterItem
} = repository.models;

class ProductController{
    async createProduct(req, res, next){
        try{
            const {name, price, brandId, typeId, description} = req.body;
            const {img} = req.files;

            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const newProduct = Product.create({name, price, brandId, typeId, description, img:fileName });

            return res.json(newProduct)
        }
        catch(e){
            console.error(e);
            return res.status(400).json({message: 'Something went wrong during product creation'});
        }
    }

    // async searchProducts(req, res) {
    //     let {brandId, categoryId, search, limit, page} = req.query;

    //     page = page || 1;
    //     limit = limit || 9;
    //     const offset = page * limit - limit;
    //     let where = {};

    //     if(brandId){
    //         where = {...where, brandId};
    //     }
    //     if(categoryId){
    //         where = {...where, productCategoryId: categoryId};
    //     }
    //     if(search){
    //         where = {
    //             ...where,
    //             name: {
    //                 [Sequelize.Op.iLike]: `%${search}%`,
    //             } 
    //         };
    //     }

    //     let products = await Product.findAndCountAll({limit, offset, where})

    //     return res.json(products);
    // }

    async searchProducts(req, res) {
        let page = req.query.page,
            limit = req.query.limit,
            searchValue = req.query.searchValue;

        let respData = await repository.searchProducts(searchValue, page, limit);

        return res.json(respData);
    }

    async getFilteredProducts(req, res){
        const productType = req.params.productType;

        if(!productType)
            return res.status(400).send('Product type cannot be empty');


        let page = req.query.page,
            limit = req.query.limit;

        let filterMap = new Map();

        for(let param in req.query){
            if(['limit', 'page'].includes(param)) continue;

            filterMap.set(param, req.query[param]);
        }

        let respData = await repository.getFilteredProducts(productType, filterMap, page, limit);

        return res.json(respData);
    }

    async getProduct(req, res){
        let {id} = req.params;

        if(!id)
            return res.status(400).send('Id parameter cannot be empty')

        let product = await Product.findOne({
            include: [{
                association: 'saler',
                attributes: ['id', 'name', 'rating']
            }],
            where: {id}
        });

        return res.json(product);
    }

    async createType(req, resp, next){
        try{
            const {name} = req.body;
            const newType = ProductType.create({name});

            return res.json(newType)
        }
        catch(e){
            console.error(e);
            return res.status(400).json({message: 'Something went wrong during type creation'});
        }
    }

    async getType(req, res){
        let {code} = req.params;

        if(!code)
            return res.status(400).send('Code parameter cannot be empty')

        let productType = await ProductType.findOne({where: {code}});

        if(!productType)
            return res.status(400).send(`Product type with code ${productType} was not found`);

        let filters = await FilterItem.findAll({
            attributes: ['id', 'label', 'code', 'order', 'props'],
            where: {productTypeId: productType.id},
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
            filters: filters
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

        return res.json(productTypes)
    }

    async createCategory(req, resp, next){
        try{
            const {name} = req.body;
            const newType = ProductCategory.create({name});

            return res.json(newType)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getCategory(req, res) {
        let {id} = req.params;

        if(!id)
            return res.status(400).send('Id parameter cannot be empty')

        let category = await ProductCategory.findOne({where: {id}});

        return res.json(category);
    }

    async getCategories(req, res) {
        let {limit, page, typeId, orderBy} = req.query;
        page = page || 1;
        limit = limit || 10;
        const offset = page * limit - limit;
        let where = {};

        if(typeId) where = {...where, productTypeId: typeId};

        orderBy = orderBy ?? [['popularity', 'DESC']]
        
        let types = await ProductCategory.findAndCountAll({
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