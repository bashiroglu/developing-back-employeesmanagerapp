const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(parser.json());
app.use('/api/v1/users', userRoutes);

mongoose
  .connect('mongodb://localhost:27017/locationapp')
  .then(() => {
    app.listen(3003);
  })
  .then(() => {
    console.log('connected to DB successfully');
  })
  .catch(error => console.log(error));
