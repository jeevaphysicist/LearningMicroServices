const express = require('express');
const httpProxy = require('http-proxy');
const app = express();

// Create proxy instances
const authProxy = httpProxy.createProxyServer({ target: 'http://localhost:7878' });
const userProxy = httpProxy.createProxyServer({ target: 'http://localhost:8080' });
const orderProxy = httpProxy.createProxyServer({ target: 'http://localhost:8081' });

 
app.use('/auth', (req, res) => {
  authProxy.web(req, res);
}); 

// Proxy middleware for user microservice
app.use('/user', (req, res) => {
  userProxy.web(req, res);
}); 

// Proxy middleware for order microservice
app.use('/order', (req, res) => {
  orderProxy.web(req, res);
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

// Error handling

authProxy.on('error', (err, req, res) => {
  console.error(err);
  res.status(500).send('Proxy error');
});

userProxy.on('error', (err, req, res) => {
  console.error(err);
  res.status(500).send('Proxy error');
});

orderProxy.on('error', (err, req, res) => {
  console.error(err);
  res.status(500).send('Proxy error');
});
          
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
