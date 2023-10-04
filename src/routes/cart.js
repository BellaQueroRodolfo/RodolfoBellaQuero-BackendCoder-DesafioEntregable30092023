const express = require('express');
const router = express.Router();
const ProductManager = require('../productManager');
const productManager = new ProductManager('./data/products.json', './data/carts.json');

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

router.post('/', async (req, res) => {
  try {
    const newCart = await productManager.createCart();
    res.status(201).json({ cart: newCart });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:cid/products/:pid', async (req, res) => { // Corrected route
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    const updatedCart = await productManager.addToCart(cartId, productId);
    if (!updatedCart) {
      res.status(404).json({ error: 'Cart or Product not found' });
    } else {
      res.json({ cart: updatedCart });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:cid/products/:pid', async (req, res) => { // Corrected route
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;
  try {
    const updatedCart = await productManager.updateCartProductQuantity(cartId, productId, quantity);
    if (!updatedCart) {
      res.status(404).json({ error: 'Cart or Product not found' });
    } else {
      res.json({ cart: updatedCart });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
