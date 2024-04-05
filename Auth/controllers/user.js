const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.createAccount= async (req,res)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    let newuser = {
        name: req.body.name, 
        email : req.body.email,   
        password : hash    
    }
    const findExistingUser = await User.findOne({email:req.body.email});
    if(!findExistingUser)
    {
       try{
           const user = await User.create(newuser);
           const token = await jwt.sign({_id: user._id}, process.env.SECRET , {expiresIn:'24h'})
           res.cookie('mycookie', token, { httpOnly: true }).status(200).json({ login: true, token });
       }catch(err){
           return res.status(500).send("Server error");
       }
    }else{
        return res.status(409).send("Email already in use")
    }
}

exports.Login= async (req,res)=>{
    let FindExistingUser = await User.findOne({email:req.body.email});
    if(FindExistingUser)
      {           
        const validPassword = bcrypt.compareSync(req.body.password, FindExistingUser.password);
        if(validPassword){
             let token = await jwt.sign({ id:FindExistingUser._id} , process.env.SECRET , {expiresIn:"24h"} );
             res.cookie("mycookie",token,{httpOnly:true}).json({login:true,token:token});
        }
        else{
             res.status(401).json({message:"Invalid Password"});
        }
    }
}