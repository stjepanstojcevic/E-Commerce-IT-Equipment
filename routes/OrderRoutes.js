const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middlewares/AuthMiddleware');
const OrderController = require('../controllers/OrderController');

router.route('/')
  .post(AuthMiddleware, OrderController.CreateOrderAsync)
  .get(AuthMiddleware, OrderController.FindOrdersAsync);

module.exports = router;