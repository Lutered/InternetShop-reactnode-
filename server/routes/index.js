const Router = require('express');
const router = new Router();
const productRouter = require('./ProductRouter');
const productTypeRouter = require('./ProductTypeRouter');
//const userRouter = require('./userRouter')

//router.use('/user', userRouter)
router.use('/product', productRouter);
router.use('/producttype', productTypeRouter);

module.exports = router;