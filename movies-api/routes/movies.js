var express = require('express');
var router = express.Router();

// Simple in-memory representation
var moviesList = [
  {
    "id" : 1,
    "title" : "Star Wars",
    "releaseYear" : 1983
  },
  {
    "id" : 11,
    "title" : "Star Trek",
    "releaseYear" : 1981
  },
  {
    "id" : 21,
    "title" : "Shrek",
    "releaseYear" : 2004
  }
];

router.get('/', function(req, res) {
  res.send(moviesList);
});

router.get('/:id', function(req, res) {
  var movieId = parseInt(req.params.id, 10);
  var matchingMovie = moviesList.find(function(movie) {
    return movieId === movie.id;
  });
  if (matchingMovie) {
    res.send(matchingMovie);
  } else {
    res.send(404, {error: {message: 'We did not find a movie with id: ' + req.params.id } });
  }
});

router.post('/', function(req, res) {
  if (!req.body.title) {
    res.send(400, {error: {message: 'A title is required to create a new movie.'} });
    return;
  }

  var created = {
    id: 'tbd',
    title: req.body.title,
    releaseYear: req.body.releaseYear,
  };
  moviesList.push(created);

  res.send(201, created);
});

module.exports = router;
