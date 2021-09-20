const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middlewares/AuthMiddleware');
const AccountController = require('../controllers/AccountController');

// Public
router.route('/register').post(AccountController.RegisterAsync);
router.route('/login').post(AccountController.LoginAsync);

// Protected
router.route('/userinfo').get(AuthMiddleware, AccountController.GetByIdAsync);


module.exports = router;
