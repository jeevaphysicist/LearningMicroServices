const User = require('../models/user');

exports.GetaUser = async (req,res)=>{
    console.log("req.param",req.params.id); 
    try{
     let getUser = await User.findOne({_id:req.params.id});
     if(!getUser) return res.status(401).send("No user found");
     res.status(200).send(getUser);
    }
    catch(err){
     res.status(500).json({mesage:"error in database" , err}); 
    }
} 
