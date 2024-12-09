const ApiError = require('../error/ApiError');
const { Product, ProductType, ProductCategory } = require('../database/models/models');
const uuid = require('uuid');
const path = require('path');
const {Sequelize} = require('sequelize')

class ProductController{
    async createProduct(req, resp, next){
        try{
            const {name, price, brandId, typeId, description} = req.body;
            const {img} = req.files;

            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const newProduct = Product.create({name, price, brandId, typeId, description, img:fileName });

            return res.json(newProduct)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async searchProducts(req, res) {
        let {brandId, categoryId, searchValue, limit, page} = req.query
        page = page || 1;
        limit = limit || 9;
        const offset = page * limit - limit;
        let where = {};

        if(brandId){
            where = {...where, brandId};
        }
        if(categoryId){
            where = {...where, productCategoryId: categoryId};
        }
        if(searchValue){
            where = {
                ...where,
                name: {
                    [Sequelize.Op.iLike]: `%${searchValue}%`,
                } 
            };
        }

        let products = await Product.findAndCountAll({limit, offset, where})

        return res.json(products);
    }

    async getProduct(req, res){
        let {id} = req.params;

        if(!id)
            return res.status(400).send('Id parameter cannot be empty')

        let product = await Product.findOne({where: {id}});

        return res.json(product);
    }

    async createType(req, resp, next){
        try{
            const {name} = req.body;
            const newType = ProductType.create({name});

            return res.json(newType)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getType(req, res){
        let {id} = req.params;

        if(!id)
            return res.status(400).send('Id parameter cannot be empty')

        let productType = await ProductType.findOne({where: {id}});

        return res.json(productType);
    }

    async getTypes(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 20
        const offset = page * limit - limit
        let types = await ProductType.findAndCountAll({
            limit, 
            offset,
            order: [
                ['order', 'ASC'],
            ]
        });

        return res.json(types)
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
        limit = limit || 4;
        const offset = page * limit - limit;
        let where = {};

        if(typeId) where = {...where, productTypeId: typeId};

        let types = await ProductCategory.findAndCountAll({
            limit, 
            offset,
            where,
            order: [
                ['popularity', 'DESC'],
            ]
        });

        return res.json(types);
    }
}

module.exports = new ProductController();