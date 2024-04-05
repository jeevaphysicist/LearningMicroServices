const { Schema , model } = require('mongoose')

const  orderSchema = new Schema({
    id: { type : String, required : true }, 
    productName: { type : String, required : true },
    userID:{type:String,required:true},
    name : {type :String ,required :true},
    totalPrice:{type:Number,required:true}
},{timestamps:true})

module.exports = model('orderCollection',orderSchema,'orderCollection');