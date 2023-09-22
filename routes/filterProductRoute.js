
const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../static/html'));
app.use(require('../middleware/sessionHandler'));

const {postFilterProduct,filterProduct} = require('../controllers/filterProductController')

app.post('/filter-product', postFilterProduct);
app.get('/filter-product', filterProduct);

module.exports = app;