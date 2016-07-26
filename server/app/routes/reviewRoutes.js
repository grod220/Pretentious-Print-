'use strict';
var router = require('express').Router();
var db = require('../../db');
var Review = db.model('review');

// POST one
router.post('/', function(req,res,next) {
  Review.create(req.body)
  .then(function(result) {
    res.status(201).send(result);
  });
});

// Fetch ALL by product ID
router.get('/:id', function(req,res,next) {
  Review.findAll({
    where: {
      productId: req.params.id
    }
  })
  .then(function(result) {
    res.send(result);
  })
  .catch(next);
});
    // PUT/Update one
    // Admin or owner: DELETE

module.exports = router;
