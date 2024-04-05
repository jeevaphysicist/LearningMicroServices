const Order = require('../models/order');

exports.createaOrder = async (req,res)=>{
  
    try{
    let order = req.body;
     order.id = String(Math.random()).substr(2,5);
    // console.log("req.user",req.user);
    let user = await fetch(`${process.env.usermicroserviceurl}/users/getauser/${req.user.id}`,{method:"GET",headers:{'Cookie':req.headers.cookie}}).then(res=>res.json())
    // console.log("user",user);   
    order.userID = user._id;  
    order.name = user.name;
    let createOrder = await Order.create(order);
    res.status(201).json({message:"Order create Successfully",order:createOrder});
    }
    catch(error){
    res.status(500).json({message:"error in database",error:error});
     
    }
}
exports.GetaOrder = async (req,res)=>{
    try{
     let getOrder = await Order.findOne({id:req.params.id});
     if(!getOrder) return res.status(401).send("No order found");
     res.status(200).send(getOrder);
    }
    catch(err){
     res.status(500).json({mesage:"error in database" , err}); 
    }
} 
