const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 8080;

app.use(express.json());

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Serve static files
app.use(express.static('public'));

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

app.get('/real-time-products', (req, res) => {
  res.render('realTimeProducts');
});

io.on('connection', (socket) => {
  socket.on('new-product', (product) => {
    io.emit('product-added', product);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
