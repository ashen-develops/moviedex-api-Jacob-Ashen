const express = require('express');
const morgan = require('morgan');
const data = require('./data.js');

const app = express();

app.use(morgan('dev'))
app.get('/', (req, res) =>{
  res.send('Hello!')
})

app.get('/movie', (req, res) => {
  const {genre, country, avg_vote} = req.query;
  let movies = data;
  console.log(movies)



})