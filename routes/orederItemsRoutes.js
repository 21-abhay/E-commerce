const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../static/html'));
app.use(require('../middleware/sessionHandler'));

const {orderItem, orderItemPost,orderAllitemsGet,orderAllitemsPost} = require('../controllers/orderController');
const varifyUser = require('../middleware/varifyUser');

app.get('/:itemid',varifyUser, orderItem);

app.get('/cart/allbooks',varifyUser, orderAllitemsGet);

app.post('/book/:itemid',varifyUser, orderItemPost);

app.post('/cart/allbooks',varifyUser, orderAllitemsPost);



module.exports = app;