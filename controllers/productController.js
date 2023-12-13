const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    console.log('Fetching products...');
    try {
      const query = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
      const products = await Product.find(query);
      console.log('Products fetched:', products); // Log the result
      res.json(products);
    } catch (err) {
      console.error('Error fetching products:', err); // Log any errors
      res.status(500).send(err.message);
    }
  };

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add new product
exports.addProduct = async (req, res) => {
  try {
    let product = new Product(req.body);
    product = await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Update product by ID
exports.updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Delete product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.send('Product deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete all products
exports.deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.send('All products deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
