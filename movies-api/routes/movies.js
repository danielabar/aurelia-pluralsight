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

// 1 second delay to test UI loading indicator
router.get('/:id', function(req, res) {
  setTimeout(function() {
    var movieId = parseInt(req.params.id, 10);
    var matchingMovie = moviesList.find(function(movie) {
      return movieId === movie.id;
    });
    if (matchingMovie) {
      res.send(matchingMovie);
    } else {
      res.status(404).send({error: {message: 'We did not find a movie with id: ' + req.params.id } });
    }
  }, 1000);

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

router.put('/:id', function(req, res) {
  var movieId = parseInt(req.params.id, 10);
  var matchingMovie;

  if (!req.body.title) {
    res.send(400, {error: {message: 'Title is required'} });
    return;
  }

  for (var i=0; i<moviesList.length; i++) {
    if (moviesList[i].id === movieId) {
      matchingMovie = moviesList[i];
      matchingMovie.title = req.body.title;
      matchingMovie.releaseYear = req.body.releaseYear;
    }
  }

  if (matchingMovie) {
    res.send(matchingMovie);
  } else {
    res.send(404, {error: {message: 'We did not find a movie with id: ' + req.params.id } });
  }
});

module.exports = router;
