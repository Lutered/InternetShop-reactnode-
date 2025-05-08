const Router = require('express');
const router = new Router();

const productRouter = require('./ProductRouter');
const basketRouter = require('./BasketRouter');
const userRouter = require('./UserRouter');
const authRouter = require('./AuthRouter');

const authMiddleware = require('../middleware/AuthMiddleware');

router.use('/user', authMiddleware(), userRouter)
router.use('/products', productRouter);
router.use('/basket', basketRouter);
router.use('/auth', authRouter);

module.exports = router;