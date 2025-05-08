const Router = require('express');
const productController = require('../controllers/ProductController');
const errorShell = require('./shells/ErrorShell');

const router = new Router();

router.post('/create', errorShell(productController.createProduct));
//router.get('/search', errorShell(productController.searchProducts));
router.get('/search', errorShell(productController.searchProducts));
router.get('/search2/:productType', errorShell(productController.getFilteredProducts));
router.get('/get/:id', errorShell(productController.getProduct));
router.get('/createType', errorShell(productController.createType));
router.get('/getType/:code', errorShell(productController.getType));
router.get('/getTypes', errorShell(productController.getTypes));
router.get('/createCategory', errorShell(productController.createCategory));
router.get('/getCategory/:id', errorShell(productController.getCategory));
router.get('/getCategories', errorShell(productController.getCategories));

module.exports = router;