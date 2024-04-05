const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
dotenv.config();

// Routes
const authRoutes = require( './routes/user' );

const app = express();

// DB Connection
mongoose.connect(process.env.MONGOURL)
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.log(`DB error: ${err}`));


//  middlewares
app.use(bodyParser.json()); // support json encoded bodies

// Api Calls
app.use('/auth',authRoutes);

// Mock data for the API
let users = [
  { id: '1', name: "John Doe" , password:"2002" },
  { id: '2', name: "Jane Smith" , password:"2000" }
];  

function getUserById(id) {
  return new Promise((resolve, reject) => {
    let user = users.filter(u => u.id == id)[0] || null;
    if (user) resolve(user);
    else reject(`User Not Found continue signup`);
  });
}

// GET /users/:id - retrieve a single user by :id




// PORT
let port = process.env.PORT || 7878;
app.listen(port, ()=> console.log(`Listening on ${port}`));