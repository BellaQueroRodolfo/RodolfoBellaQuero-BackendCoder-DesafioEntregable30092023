const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const exphbs = require('express-handlebars');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.json());
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', 'src/views');
app.use(express.static('public'));
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('new-product', (product) => {
    io.emit('product-added', product);
  });
  socket.on('delete-product', (productId) => {
    io.emit('product-deleted', productId);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = process.env.PORT || 8080;

http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
