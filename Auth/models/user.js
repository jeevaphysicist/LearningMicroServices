const { Schema , model } = require('mongoose')

const  userSchema = new Schema({
    name: { type : String, required : true },
    password : {type :String ,required :true},
    email:{type:String}
},{timestamps:true})

module.exports = model('userCollection',userSchema,'userCollection');