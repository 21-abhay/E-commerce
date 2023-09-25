

const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../static/html'));
app.use(require('../middleware/sessionHandler'));

// const varifyUser = require('../middleware/varifyUser')  
const {adminControllerGet,adminControllerPost,adminLogout,adminPortal,removeItem,addItem} = require('../controllers/admincontroller');

app.get('/login/admin',adminControllerGet);

app.get('/logout',adminLogout);

app.post('/login/admin',adminControllerPost);

app.get('/portal',adminPortal);

app.get('/remove/:book_id',removeItem);

app.get('/add/:book_id',addItem);

module.exports = app;