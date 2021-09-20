const User = require('../models/User');
const OrderService = require('../services/OrderService');

class OrderController {
  static async CreateOrderAsync(req, res){
    var newOrder = {};
    newOrder.userId = req.user.sub;
    newOrder.shoppingCart = req.body;
    var order = await OrderService.CreateAsync(newOrder);
    if(!order) {
      return res.status(400).json({ statusCode: 400, message: "Bed request"});
    }
    return res.status(201).json({ statusCode: 201, data: order });
  }

  static async FindOrdersAsync(req, res) {
    return await OrderService.FindOrdersAsync(req.user.sub);
  }

}

module.exports = OrderController;
