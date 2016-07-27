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

// Fetch one review by ID
router.get('/:reviewId', function(req, res, next) {
  Review.findById({
    where: {
      id: req.params.reviewId
    }
  })
  .then(function(review) {
    res.send(review);
  })
  .catch(next)
})
    // PUT/Update one

router.put('/:reviewId', function(req, res, next) {
  Review.update(req.body, {
    where: {
      id: req.params.reviewId
    },
    returning: true
  })
  .then(function(review) {
    res.send(review[1][0].dataValues);
  })
})

    // Admin or owner: DELETE
router.delete('/:reviewId', function(req, res, next) {
  // to be set up after sessions
})

module.exports = router;
