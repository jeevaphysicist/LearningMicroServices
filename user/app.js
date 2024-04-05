const express = require('express');
const app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const userRoute = require('./routes/user');

// DB Connection
mongoose.connect(process.env.MONGOURL)
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.log(`DB error: ${err}`));

// middlewares 
app.use(bodyParser.json());  

// Route Redirect
app.use('/users',userRoute);
 
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
let port = process.env.PORT || 8080;
app.listen(port, ()=> console.log(`Listening on ${port}`));