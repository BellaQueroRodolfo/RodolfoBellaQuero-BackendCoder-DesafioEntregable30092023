const fs = require('fs').promises;

class ProductManager {
  constructor(productsFilePath, cartsFilePath) {
    this.productsFilePath = productsFilePath;
    this.cartsFilePath = cartsFilePath;
  }

  // Add methods to manage products and carts
  async getPlantProducts() {
    try {
      const productsData = await fs.readFile(this.productsFilePath, 'utf-8');
      const products = JSON.parse(productsData);
      // Implement logic to filter plant products
      return products.filter((product) => product.category === 'Plant');
    } catch (error) {
      throw error;
    }
  }

  async getPlantProductById(productId) {
    try {
      const productsData = await fs.readFile(this.productsFilePath, 'utf-8');
      const products = JSON.parse(productsData);
      const product = products.find((p) => p.id === parseInt(productId));
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getAllCarts() {
    try {
      const cartsData = await fs.readFile(this.cartsFilePath, 'utf-8');
      const carts = JSON.parse(cartsData);
      return carts;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cartsData = await fs.readFile(this.cartsFilePath, 'utf-8');
      const carts = JSON.parse(cartsData);
      const cart = carts.find((c) => c.id === cartId);
      return cart;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductManager;
