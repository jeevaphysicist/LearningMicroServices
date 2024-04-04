const express = require('express');
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
const jwt = require('jsonwebtoken');

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
app.post('/auth/login', function (req, res) {
  let id = req.body.id;
  getUserById(id).then(user =>{
     if(user.password == req.body.password){
        const token = jwt.sign({ id: user.id , isloggedin:true ,name:user.name }, "f84hf4h4hfhfhfwei9393=ij");
        res.cookie('mycookie', token, { expires: new Date(Date.now() + 900000), httpOnly: true }).status(200).json({ login: true, token });
     }
     else{
        res.status(400).send({error:"Invalid Password"});
     }
    })
     .catch(err => res.status(400).end(err));
});



// PORT
let port = process.env.PORT || 7878;
app.listen(port, ()=> console.log(`Listening on ${port}`));