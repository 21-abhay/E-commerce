
const con = require('../config/mysqlDB');

const filterProduct = (req,res)=>{
    console.log(req.body);
    res.send(req.body)
    // res.redirect('/home')
}

module.exports = filterProduct;