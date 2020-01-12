const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept '
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

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
