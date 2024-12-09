const Router = require('express');
const router = new Router();
const basketController = require('../controllers/BasketController');

router.get('/get/:id', basketController.get);
router.get('/getCount/:id', basketController.getCount);
router.post('/addProduct', basketController.add);
router.post('/removeProduct', basketController.remove);
router.post('/changeCount', basketController.changeItemCount);

module.exports = router;