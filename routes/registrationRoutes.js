const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../static/html'));
app.use(require('../middleware/sessionHandler'));

const {loginGet, loginPost} = require('../controllers/loginController')
const logout = require('../controllers/logoutController')
const {signupGet, signupPost} = require('../controllers/signupController')
const upload = require('../config/uploadUserImage')

app.get('/login' ,loginGet);
app.post('/login' ,loginPost);
app.get('/logout', logout);
app.post('/signup',upload.single('image'), signupPost);
app.get('/signup', signupGet);



module.exports = app;