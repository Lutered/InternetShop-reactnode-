const ApiError = require('../error/ApiError');
const { Product } = require('../database/models/models');
const uuid = require('uuid');
const path = require('path');

class ProductController{
    async create(req, resp, next){
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

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        const offset = page * limit - limit
        let products;
        if (!brandId && !typeId) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            products = await Product.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            products = await Product.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            products = await Product.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }

        return res.json(products);
    }

    async getOne(req, res){
        let {id} = req.params;

        if(!id)
            return res.status(400).send('Id parameter cannot be empty')

        let product = await Product.findOne({where: {id}});

        return res.json(product);
    }
}

module.exports = new ProductController();