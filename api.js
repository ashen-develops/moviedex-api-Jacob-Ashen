require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const data = require('./data.js')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(function validateToken(req,res,next){
  const API_TOKEN = process.env.API_TOKEN
  const authVal = req.get('Authorization') || ''
  if (!authVal.startsWith('Bearer ')) {
    return res.status(400).json({message: 'Bearer auth header missing!'})
  }
  const token = authVal.split(' ')[1]
  if (token !== API_TOKEN){
    return res.status(401).json({message: 'Invalid Credentials'})
  }
  next()
})

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