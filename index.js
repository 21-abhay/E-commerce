const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const errorhandler= require('./middleware/errorHandler');
app.use(errorhandler);
app.use(express.json());



app.use('/admin', require('./routes/adminRoutes'));
app.use('', require('./routes/homeRoute'));
app.use('', require('./routes/registrationRoutes'))
app.use('/profile', require('./routes/profileRoute'))
app.use('/product', require('./routes/productDetailsRoutes'))
app.use('/order', require('./routes/orederItemsRoutes'))
app.use('/view/order', require('./routes/viewOrederItemsRoutes'))
app.use('/insert', require('./routes/insertionRoutes'))
app.use('/update', require('./routes/updatationRoutes'))
app.use('', require('./routes/filterProductRoute'))
app.use('/addtocart', require('./routes/addtocart'))
app.use('/viewcart', require('./routes/viewcartRoute'))
app.use('/removefromcart', require('./routes/removefromcartRoutes'));
app.use('/sendmail', require('./routes/sendMail'));

const port = process.env.PORT;
app.listen(port,'0.0.0.0', () => {
    console.log(`Server is started at http://localhost:${port}`);
});
