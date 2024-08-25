const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

// Connect to SQLite database
(async () => {
  db = await open({ filename: "database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 CW - SQL Queries & async/await" });
});

// YOUR ENPOINTS GO HERE

//1
const fetchAllMovies = async () => {
  let query = 'select * from movies';
  let response = await db.all(query, []);
  return { movies: response };
}
app.get('/movies', async (req, res) => {
  let results = await fetchAllMovies();
  res.status(200).json(results);
});
//movies

//2
async function fatchMovieByGenre(genre) {
  let query = 'select * from movies where genre = ?';
  let response = await db.all( query, [genre]);
  return { movies: response };
}
app.get('/movies/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let results = await fatchMovieByGenre(genre);
  res.status(200).json(results);
});
//movies/genre/Biography

//3
async function fatcMovieById(Id) {
  let query = 'select * from movies where Id = ?';
  let response = await db.get(query, [Id]);
  return { movies: response };
}
app.get('/movies/details/:id', async (req, res) => {
  let id = req.params.id;
  let result = await fatcMovieById(id);
  res.status(200).json(result);
});
//movies/details/3

//4
async function fetchMoviesByReleaseYear(releaseYear) {
  let query = 'select * from movies where release_year = ?';
  let response = await db.all(query, [releaseYear]);
  return { movies: response };
}
app.get('/movies/release_year/:year', async (req, res) => {
  let releaseYear = req.params.year;
  let result = await fetchMoviesByReleaseYear(releaseYear);
  res.status(200).json(result);
});
//movies/release_year/2016
//movies/release_year/2019

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
