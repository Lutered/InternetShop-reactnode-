const Router = require('express');
const router = new Router();
const productRouter = require('./ProductRouter');
const basketRouter = require('./BasketRouter');
//const userRouter = require('./userRouter')

const basketController = require('../controllers/BasketController');
//router.use('/user', userRouter)
router.use('/products', productRouter);
router.use('/basket', basketRouter);

module.exports = router;