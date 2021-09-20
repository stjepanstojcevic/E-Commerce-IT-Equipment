const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const File = mongoose.model("File");
const Chunk = mongoose.model("Chunk");
const ObjectId = mongoose.Schema.Types.ObjectId;



class ProductService {

  static async InsertAsync(newProduct, hasImage) {
    var product = new Product(newProduct);
    
    if(hasImage){
      product.setImageUrl();
    }

    product.save();
    return product;
  }

  static async UpdateAsync(id, body){
    let product = await ProductService.GetAsync(id);
    body.imageUrl = product.imageUrl;
    product.overwrite(body);
    await product.save();
    return product;
  }

  static async DeleteAsync(productId){
    return await Product.deleteOne({_id: productId }).exec();
  }
  
  static async FindAsync(category = null) {
    let query = {};
    if (category) {
      query = { "category": category }
    }
    return await Product.find(query).limit(100).exec();
  }

  static async GetAsync(productId){
    return await Product.findOne({ "_id": productId }).exec();
  }

  static async GetProductImageAsync(productId) {
    return await File.findOne({ "metadata.owner": productId }).exec();
  }

  static async DeleteProductImageAsync(id) {
    await Chunk.deleteMany({ files_id: id }).exec();
    return await File.deleteOne({ _id: id }).exec();
  }

  static async GetCategoriesAsync(){
    return await Product.distinct("category").exec();
  }
}

module.exports = ProductService;