const express = require('express');
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies

// Mock data for the API
let orders = [
  { id: '1', name: "Kids Book",user:"John Doe",userid:"1" },
  { id: '2', name: "Harry Potter",user:"Jane Smith",userid:"2" }
];

function getOrderById(id) {
  return new Promise((resolve, reject) => {
    let user = orders.filter(u => u.id == id)[0] || null;
    if (user) resolve(user);
    else reject(`No user with ID ${id}`);
  });
}

// GET /users/:id - retrieve a single user by :id
app.get('/order/:id', function (req, res) {
  let id = req.params.id;
  getOrderById(id).then(order => res.status(200).send(order)).catch(err => res.status(400).end(err));
});
 
// POST /users - create a new user
app.post('/orders',async function (req , res) {
  let order = req.body;
  order.id = String(Math.random()).substr(2,5);
  let user = await fetch(`http://localhost:8080/users/${req.body.userid}`,{method:"GET"}).then(res=>res.json())
  console.log("user",user);
  order.userid = user.id;
  order.user = user.name;
  orders.push(order);
  console.log("orders",orders);
  res.status(201).send({ order });
});

// PORT
let port = process.env.PORT || 8081;
app.listen(port, ()=> console.log(`Listening on ${port}`));