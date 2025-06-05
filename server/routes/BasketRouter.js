const Router = require('express');
const basketController = require('../controllers/BasketController');
const errorShell = require('./shells/ErrorShell');

const router = new Router();

router.get('/get/:id', errorShell(basketController.get));
router.get('/getCount/:id', errorShell(basketController.getCount));
router.post('/addProduct', errorShell(basketController.add));
router.post('/removeProduct', errorShell(basketController.remove));
router.post('/changeCount', errorShell(basketController.changeItemCount));

module.exports = router;