const jwt = require('jsonwebtoken');
const { createError }  = require('./Error');
exports.VerifyToken = async (req,res,next)=>{
    console.log("token",req.cookies);
const token = req.cookie;
if(!token) return next(createError(404,"you are not authenticated")); 
jwt.verify( token , process.env.JWT , (err,user)=>{
    if(err) return next(createError(403,'Token is not valid'))
    req.user = user;
    next();
})
}  