const express = require('express');
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/create', productController.createProduct);
router.put('/update/:id', productController.updateProduct);
router.get('/detail/:id', productController.getProductById);
router.delete('/delete/:id', productController.deleteProduct);
router.get('list', productController.getAllProducts);

module.exports = router;
