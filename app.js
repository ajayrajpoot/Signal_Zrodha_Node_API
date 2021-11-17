const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')

const app=express();


const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth'); 
const apiRoutes = require('./routes/test'); 


// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use(cors());
 

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.use('/test', (req,res,next)=>{

  res.send("Hello")
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://ajtest:J9Xv169XWFbkSoQT@cluster0.b2p29.mongodb.net/test?retryWrites=true'
  )
  .then(result => {
    app.listen(8082);
  })
  .catch(err => console.log(err));
