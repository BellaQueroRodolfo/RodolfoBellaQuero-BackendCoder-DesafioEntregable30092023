const express = require('express');
const router = express.Router();
const ProductManager = require('../productManager');
const productManager = new ProductManager('../data/products.json', '../data/carts.json');

router.get('/', async (req, res) => {
  try {
    const carts = await productManager.getAllCarts();
    res.json({ carts });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await productManager.getCartById(cartId);
    if (!cart) {
      res.status(404).json({ error: 'Cart not found' });
    } else {
      res.json({ cart });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
