const Router = require('express');
const userController = require('../controllers/UserController');
const errorShell = require('./shells/ErrorShell');

const router = new Router();

router.get('/test', userController.test);

module.exports = router;