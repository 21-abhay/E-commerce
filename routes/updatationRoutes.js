const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../static/html'));
app.use(require('../middleware/sessionHandler'));


const updateDetails =require('../controllers/updateDetailsController');
const updateAccount =require('../controllers/updateAccountController');
const updateLocation =require('../controllers/updateLocationController');
const varifyUser = require('../middleware/varifyUser');



app.get('/update-details/:profileId',varifyUser, updateDetails.updateDetailsGet);

app.get('/update-location/:profileId',varifyUser, updateLocation.updateLocationGet);

app.get('/update-account/:profileId',varifyUser, updateAccount.updateAccountGet);

app.post('/update-details/:profileId',varifyUser, updateDetails.updateDetailsPost);

app.post('/update-location/:profileId',varifyUser, updateLocation.updateLocationPost);

app.post('/update-account/:profileId',varifyUser, updateAccount.updateAccountPost);



module.exports = app;