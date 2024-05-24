const ApiError = require('../error/ApiError');
const { ProductType } = require('../models/models');

class ProductTypeController{
    async create(req, resp, next){
        try{
            const {name} = req.body;
            const newType = ProductType.create({name});

            return res.json(newType)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        const offset = page * limit - limit
        let types = await ProductType.findAndCountAll({limit, offset});

        return res.json(types)
    }
}

module.exports = new ProductTypeController();