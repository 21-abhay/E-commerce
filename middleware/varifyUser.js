const express = require('express');
const app = express();
app.use(require('./sessionHandler'));

const varifyUser = (req,res,next)=>{
    if(req.session.user){
        next();
    }
    else{
        res.redirect('/login');
    }
}

module.exports = varifyUser;
