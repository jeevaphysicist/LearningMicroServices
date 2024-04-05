const express = require('express');
const app = express(); 
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose'); 
 
const orderRoutes = require('./routes/order');

mongoose.connect(process.env.MONGOURL);
mongoose.connection.on('connected',()=>console.log("Connected To Database "));
mongoose.connection.on('error',(err)=>console.log("Database error ",err));


// middelwares
app.use(bodyParser.json());

// API Routes
app.use('/orders',orderRoutes);

app.use((err ,req,res,next)=>{
  const status = err.status || 500  ;
  const message = err.message || "Something went wrong"  ;
  return res.status(status).json({
       success:false,
       message,
       status
  })
})

// PORT
let port = process.env.PORT || 8081;
app.listen(port, ()=> console.log(`Listening on ${port}`));