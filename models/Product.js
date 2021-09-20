const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const { API_URI, DEFAULT_IMAGE_URL } = process.env;

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, },
  category: { type: String, required: true, },
  short: { type: String },
  description: { type: String },
  available: { type: Boolean, default: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, default: DEFAULT_IMAGE_URL },
  spec: { type: String },
  seen: { type: Number },
});

ProductSchema.methods.setImageUrl = async function () {
  this.imageUrl = API_URI + '/api/products/image/' + this._id;
};
mongoose.model("Product", ProductSchema, "products");