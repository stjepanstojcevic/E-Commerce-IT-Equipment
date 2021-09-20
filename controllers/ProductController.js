const Readable = require("stream").Readable;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


let bucket;
mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
});

const ProductService = require("../services/ProductService");

class ProductController {

  static async CreateAsync(req, res) {
    
    const file = req.files.image
    try {
      
      var product = await ProductService.InsertAsync(req.body, !!file);

    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }

    if(!file) return res.status(201).json({ statusCode: 201, data: product });

    const readableStream = new Readable();
    readableStream.push(file.data);
    readableStream.push(null);

    let uploadStream = bucket.openUploadStream(file.name, { 
      contentType: file.mimetype, 
      metadata: { owner: product._id }
    });

    readableStream.pipe(uploadStream);
    uploadStream.on("error", () => {
        return res.status(500).send("Upload - Internal Server Error");
      });
    uploadStream.on("finish", async () => {
        return res.status(201).json({ statusCode: 201, data: product });
      });
  }

  static async UpdateAsync(req, res) {
    var product;
    const file = req.files.image
    try {
      product = await ProductService.UpdateAsync(req.params.id, req.body);
      if(file) {
        const imageInfo = await ProductService.GetProductImageAsync(product._id);
        if (imageInfo) await ProductService.DeleteProductImageAsync(imageInfo._id);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
    
    if(!file) return res.status(200).json({ statusCode: 204, data: product });
    
    const readableStream = new Readable();
    readableStream.push(file.data);
    readableStream.push(null);

    let uploadStream = bucket.openUploadStream(file.name, { 
      contentType: file.mimetype, 
      metadata: { owner: product._id }
    });

    readableStream.pipe(uploadStream);
    uploadStream.on("error", () => {
        return res.status(500).send("Upload - Internal Server Error");
      });
    uploadStream.on("finish", async () => {
        return res.status(200).json({ statusCode: 204, data: product });
      });
  }
  
  static async DeleteAsync(req, res) {
    try{
      const imageInfo = await ProductService.GetProductImageAsync(ObjectId(req.params.id));
      if (imageInfo) await ProductService.DeleteProductImageAsync(imageInfo._id);
      await ProductService.DeleteAsync(req.params.id);
      return res.status(204).json({ statusCode: 204 });
    } catch (error){
      console.log(error);
      return res.status(500).send("Internal server error");
    }
  }

  static async GetAsync(req, res) {
    try {
      const product = await ProductService.GetAsync(req.params.id)
      if (!product) return res.status(404).json({ statusCode: 404 });
      return res.status(200).json({ statusCode: 200, data: product });
    } catch (error) {
      console.log(error);
      return res.status(500).send('internal');
    }
  }

  static async GetImageAsync(req, res){
    try {
      const imageInfo = await ProductService.GetProductImageAsync(ObjectId(req.params.id));
      if(!imageInfo) return res.status(404).json({ statusCode: 404 });
      bucket.openDownloadStreamByName(imageInfo.filename).pipe(res);
    } catch (error) {
      console.log(error);
      return res.status(500).send("internal");
    }
  }
  
  static async FindAsync(req, res) {
    const { category } = req.query;
    const products = await ProductService.FindAsync(category);
    return res.status(200).json({ statusCode: 200, data: products });
  }

  static async GetCategoriesAsync(req, res) {
    const categories = await ProductService.GetCategoriesAsync()
    return res.status(200).json({ statusCode: 200, data: categories });
  }
}

module.exports = ProductController;