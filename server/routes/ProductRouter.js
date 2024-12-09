const Router = require('express');
const router = new Router();
const productController = require('../controllers/ProductController');

router.post('/create', productController.createProduct);
router.get('/search', productController.searchProducts);
router.get('/get/:id', productController.getProduct);
router.get('/createType', productController.createType);
router.get('/getType/:id', productController.getType);
router.get('/getTypes', productController.getTypes);
router.get('/createCategory', productController.createCategory);
router.get('/getCategory/:id', productController.getCategory);
router.get('/getCategories', productController.getCategories);

module.exports = router;