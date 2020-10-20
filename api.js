const express = require('express');
const morgan = require('morgan');
const games = require('./data.js');

const app = express();

app.use(morgan('dev'))
app.get('/', (req, res) =>{
  res.send('Hello!')
})