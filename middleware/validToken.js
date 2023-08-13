const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.access_token_secret, (err, decode)=>{
            if(err){
                res.status(401);
                throw new Error("User is not Authorized...")
            }
            console.log(decode);
            req.user = decode.user;
            next();
        })
    }
    if(!token){
        res.status(401);
        throw new Error("User is not Authorized or Token Expired...")
    }
})

module.exports = validateToken;
