var express = require('express');
var router = express.Router();

// Simple in-memory representation
var moviesList = [
  {
    "id" : 1,
    "title" : "Star Wars: Episode IV",
    "description": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.",
    "releaseYear" : 1977
  },
  {
    "id" : 11,
    "title" : "Star Trek: The Motion Picture",
    "description": "When an alien spacecraft of enormous power is spotted approaching Earth, Admiral Kirk resumes command of the Starship Enterprise in order to intercept, examine and hopefully stop the intruder.",
    "releaseYear" : 1979
  },
  {
    "id" : 21,
    "title" : "Shrek",
    "description": "After his swamp is filled with magical creatures, an ogre agrees to rescue a princess for a villainous lord in order to get his land back.",
    "releaseYear" : 2001
  }
];

router.get('/', function(req, res) {
  res.send(moviesList);
});

// Add a delay to test UI loading indicator
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
  }, 500);

});

router.post('/', function(req, res) {
  if (!req.body.title) {
    res.send(400, {error: {message: 'A title is required to create a new movie.'} });
    return;
  }

  var created = {
    id: 'tbd',
    title: req.body.title,
    description: req.body.description,
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
      matchingMovie.description = req.body.description;
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
