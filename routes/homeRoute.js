const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../static/html'));
app.use(require('../middleware/sessionHandler'));



const about = require('../controllers/about')
const product = require('../controllers/product')
const home = require('../controllers/home');
const sendEmail = require('../config/sendEmail');

app.get(['/','/home'], home);
app.get('/email', sendEmail);
app.get('/about', about);
app.get('/products', product);

module.exports = app;