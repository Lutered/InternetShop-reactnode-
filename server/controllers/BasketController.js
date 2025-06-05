const { Product } = require('../database/models/models');
const repository = require('../database/repository');
const { responseWithError }= require('../helpers/ErrorHelper');
const uuid = require('uuid');

const sequelize =  repository.sequelize;
const { Basket, BasketProduct } = repository.models;
class BasketController{
    async get(req, res, next){
        let {id} = req.params;
        
        if(!id)
            return responseWithError(res, 400, 'Id parameter cannot be empty');

        let basket = await BasketProduct.findAll({
            attributes: ['id', 'count'],
            include: [{
                association: 'product',
                attributes: ['id', 'name', 'price', 'img']
            },{
                association: 'basket',
                where: {uuid: id}
            }]
            //where: {basketId: id}
        });

        return res.json(basket);
    }

    async getCount(req, res, next){
        let {id} = req.params;
        
        if(!id)
            return responseWithError(res, 400, 'Id parameter cannot be empty');

        let basket = await Basket.findOne({where: {uuid: id}});

        if(!basket)
            return responseWithError(res, 400, `Baskete with Id - ${id} was not found`);

        let basketCountResp = await BasketProduct.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('count')), 'totalCount']
            ],
            where: {
                basketId: basket.id
            },
            raw: true
        });

        let basketCount = (basketCountResp && basketCountResp[0]) ? 
                            basketCountResp[0].totalCount 
                            : 0;

        return res.json(basketCount);
    }

    async add(req, res, next){
        let basketUUId = req.body.basketId;
        let productUUId = req.body.productId;

        if(!productUUId)
            return responseWithError(res, 400, 'Product id parameter cannot be empty');

        let basket = basketUUId ? 
            await Basket.findOne({where: {uuid: basketUUId}}) :
            await Basket.create({
                uuid: uuid.v4()
            });

        if(!basket)
            return responseWithError(res, 400, 'Basket was not found');

        let product = await Product.findOne({where: {uuid: productUUId}});

        if(!product)
            return responseWithError(res, 400, 'Product was not found');

        let basketProduct = await BasketProduct.findOne({
            where: {
                basketId: basket.id, 
                productId: product.id
            }
        });

        if(basketProduct){
            basketProduct.count += 1;
            await basketProduct.save();
        }else{
            basketProduct = await BasketProduct.create({
                basketId: basket.id,
                productId: product.id,
                count: 1
            });
        }

        return res.status(201).json({
            basketId: basket.uuid,
            message: 'Product was successfully added'
        });
    }

    async remove(req, res, next){
        let {id} = req.body;

        if(!id)
            return responseWithError(res, 400, 'Id parameter cannot be empty');

        let basketProduct = await BasketProduct.findOne({where: {id: id}});

        if(!basketProduct) throw new Error(`Basket item with id ${id} was not found`);

        await basketProduct.destroy();

        return res.json({
            message: 'Basket item was deleted successfully'
        });
    }

    async changeItemCount(req, res, next){
        let {id, count} = req.body;
        let message = '';

        if(!id)
            return responseWithError(res, 400, 'Id parameter cannot be empty');

        let basketProduct = await BasketProduct.findOne({where: {id: id}});

        if(!basketProduct) throw new Error(`Basket item with id ${id} was not found`);

        if(!count && count <= 0){
            await basketProduct.destroy();
            message = 'Basket item was deleted successfully';
        }else {
            basketProduct.count = count;
            basketProduct.save();
            message = 'Basket item count was changed successfully';
        }

        return res.json({
            message: message
        });
    }
}

module.exports = new BasketController();