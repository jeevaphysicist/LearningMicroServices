const express = require('express');
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
const { VerifyToken } =require('./middlewares/AuthenticationChecker');

// Mock data for the API
let users = [
  { id: '1', name: "John Doe" },
  { id: '2', name: "Jane Smith" }
];  

function getUserById(id) {
  return new Promise((resolve, reject) => {
    let user = users.filter(u => u.id == id)[0] || null;
    if (user) resolve(user);
    else reject(`No user with ID ${id}`);
  });
}

// GET /users/:id - retrieve a single user by :id
app.get('/users/:id' ,  function (req, res) {
  let id = req.params.id;
  getUserById(id).then(user => res.status(200).send(user)).catch(err => res.status(400).send({error:err}));
});
 
// POST /users - create a new user
app.post('/users', VerifyToken ,function (req , res) {
  let user = req.body;
//   console.log("user",user);
  user.id = String(Math.random()).substr(2,5);
  users.push(user);
  console.log("users",users);
  res.status(201).send({ user });
});

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