const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const userRoutes = require('./routes/user');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/userDetails',
  {
    useNewUrlParser: true
    
  }
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1',userRoutes);

app.listen(port, (req, res) => {
    console.log(`app listen in port ${port}`);
  });

