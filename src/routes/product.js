const express = require('express');
const router = express.Router();
const ProductManager = require('../productManager');
const productManager = new ProductManager('../data/products.json', '../data/carts.json');

router.get('/', async (req, res) => {
  try {
    const plantProducts = await productManager.getPlantProducts();
    res.json({ plantProducts });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    const plantProduct = await productManager.getPlantProductById(productId);
    if (!plantProduct) {
      res.status(404).json({ error: 'Plant product not found' });
    } else {
      res.json({ plantProduct });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, code, price, stock, thumbnails } = req.body;
    if (!title || !description || !code || !price || !stock || !thumbnails) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newPlantProduct = {
      title,
      description,
      code,
      price,
      stock,
      thumbnails,
    };

    const plantProduct = await productManager.addPlantProduct(newPlantProduct);
    res.status(201).json({ plantProduct });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
