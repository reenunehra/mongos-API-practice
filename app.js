const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/userDetailss',
  {
    useNewUrlParser: true
    
  }
);

var date = new Date()

console.log(date);