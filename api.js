require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const data = require("./data.js");

const app = express();
const morganSetting = process.env.NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganSetting));
app.use(cors());
app.use(helmet());
app.use(function validateToken(req, res, next) {
  const API_TOKEN = process.env.API_TOKEN;
  const authVal = req.get("Authorization") || "";
  if (!authVal.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Bearer auth header missing!" });
  }
  const token = authVal.split(" ")[1];
  if (token !== API_TOKEN) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/movie", (req, res) => {
  const { genre, country, avg_vote } = req.query;
  let movies = data;

  if (genre) {
    movies = movies.filter((movie) =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  if (country) {
    movies = movies.filter((movie) =>
      movie.country.toLowerCase().includes(country.toLowerCase())
    );
  }

  if (avg_vote) {
    movies = movies.filter((movie) => movie.avg_vote >= avg_vote);
  }

  res.status(200).send(movies);
});

app.use((error, req, res, next) => {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { error };
  }
  res.status(500).json(response);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Hello, World!");
});
