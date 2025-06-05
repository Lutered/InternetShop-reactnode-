const Router = require('express');
const authController = require('../controllers/AuthController');
const errorShell = require('./shells/ErrorShell');

const router = new Router();

router.post('/register', errorShell(authController.registration));
router.post('/login', errorShell(authController.login));

module.exports = router;