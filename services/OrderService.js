const mongoose = require('mongoose');
const Order = mongoose.model('Order');

class OrderService {
  static async CreateAsync({ userId, shoppingCart }) {
    let order = new Order({ 
      userId,
      shoppingCart,
      total: OrderService.getTotal(shoppingCart),
      createdAt: Date.now()
    });
    order.save();
    return order;
  }

  static async FindOrdersAsync(userId) {
    return await Order.find({ userId }).exec();
  }

  static getTotal(list){
    var total = 0;
    list.forEach(item => {
      item.product.price = Math.round((item.product.price + Number.EPSILON) * 100) / 100;

      total += (item.product.price * item.count);
    });
    return Math.round((total + Number.EPSILON) * 100) / 100;
  }
}

module.exports = OrderService;
