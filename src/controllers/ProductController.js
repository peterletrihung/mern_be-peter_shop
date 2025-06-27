const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is missing' });
    }
    const { name, description, price, image, type } = req.body;
    if (!name || !description || !price || !image || !type) {
      return reject(new Error('Name, description, and price are required'));
    }
    if (isNaN(price)) {
      return reject(new Error('Price must be a number'));
    }
    const product = await ProductService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.listProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await ProductService.updateProduct(req.params.id, req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await ProductService.deleteProduct(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};