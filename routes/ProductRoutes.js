const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middlewares/AuthMiddleware');
const ProductController = require('../controllers/ProductController');

router.route('/')
  .get(ProductController.FindAsync)
  .post(AuthMiddleware, ProductController.CreateAsync);

router.route('/categories')
  .get(ProductController.GetCategoriesAsync);
  
router.route('/:id')
  .get(ProductController.GetAsync)
  .put(AuthMiddleware, ProductController.UpdateAsync)
  .delete(AuthMiddleware, ProductController.DeleteAsync);

router.route('/image/:id')
  .get(ProductController.GetImageAsync);



module.exports = router;