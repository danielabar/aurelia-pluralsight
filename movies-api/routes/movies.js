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

module.exports = router;
