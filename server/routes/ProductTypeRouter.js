const Router = require('express');
const router = new Router();
const productTypeController = require('../controllers/ProductTypeController');

router.post('/', productTypeController.create);
router.get('/', productTypeController.getAll);
//router.get('/:id', productController.getOne)

module.exports = router;