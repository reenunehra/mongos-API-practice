const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/user');

mongoose.connect('mongodb://localhost:27017/userDetails',
  {
    useNewUrlParser: true
    
  }
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1',userRoutes);

app.listen(3000);

