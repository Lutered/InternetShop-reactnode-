const sequelize = require('../database/database');

const ApiError = require('../error/ApiError');
const { Basket, BasketProduct } = require('../database/models/models');

class BasketController{
    async get(req, res, next){
        let {id} = req.params;
        
        if(!id)
            return res.status(400).send('Id parameter cannot be empty');

        let basket = await BasketProduct.findAll({
            attributes: ['id', 'count'],
            include: [{
                association: 'product',
                attributes: ['id', 'name', 'price', 'img']
            }],
            where: {basketId: id}
        });

        return res.json(basket);
    }

    async getCount(req, res, next){
        let {id} = req.params;
        
        if(!id)
            return res.status(400).send('Id parameter cannot be empty');

        let basketCountResp = await BasketProduct.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('count')), 'totalCount']
            ],
            group: ['basketId'],
            having: {basketId: id},
            raw: true
        });

        let basketCount = (basketCountResp && basketCountResp[0]) ? 
                            basketCountResp[0].totalCount 
                            : 0;

        return res.json(basketCount);
    }

    async add(req, res, next){
        let {basketId, productId} = req.body;

        try{
            if(!productId)
                return res.status(400).send('Product id parameter cannot be empty');

            let basket = basketId ? 
                await Basket.findOne({where: {id: basketId}}) :
                await Basket.create({});

            if(!basket)
                throw 'Basket was not found';

            basketId = basket.id;

            let basketProduct = await BasketProduct.findOne({
                where: {basketId, productId}
            });

            if(basketProduct){
                basketProduct.count += 1;
                await basketProduct.save();
            }else{
                basketProduct = await BasketProduct.create({
                    basketId: basketId,
                    productId: productId,
                    count: 1
                });
            }

            return res.json({
                basketId: basketId,
                message: 'Product was successfully added'
            });
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async remove(req, res, next){
        let {id} = req.body;

        try
        {
            if(!id)
                return res.status(400).send('Id parameter cannot be empty');

            let basketProduct = await BasketProduct.findOne({where: {id: id}});

            if(!basketProduct) throw(`Basket item with id ${id} was not found`);

            await basketProduct.destroy();

            return res.json({
                message: 'Basket item was deleted successfully'
            });
                
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async changeItemCount(req, res, next){
        let {id, count} = req.body;
        let message = '';

        try
        {
            if(!id)
                return res.status(400).send('Id parameter cannot be empty');

            let basketProduct = await BasketProduct.findOne({where: {id: id}});

            if(!basketProduct) throw(`Basket item with id ${id} was not found`);

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
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController();