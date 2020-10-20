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

  if (genre){
    movies = movies.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()))
  }

  if (country){
    movies = movies.filter(movie => movie.country.toLowerCase().includes(country.toLowerCase()))
  }
  
  if (avg_vote){
    movies = movies.filter(movie => movie.avg_vote >= avg_vote)
  }

  res.status(200).send(movies)
})

app.listen(8000, () => {
  console.log('Server started on port 8000')
})