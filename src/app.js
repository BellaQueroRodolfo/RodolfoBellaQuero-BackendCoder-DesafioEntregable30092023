const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
