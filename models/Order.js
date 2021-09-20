const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const OrderSchema = new mongoose.Schema({
  userId: { type: ObjectId, required: true },
  shoppingCart: { type: [Object] },
  total: { type: Number },
  createdAt: { type: Date }, 
});

mongoose.model("Order", OrderSchema, "orders");