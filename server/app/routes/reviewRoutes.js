'use strict';
var router = require('express').Router();
var db = require('../../db');
var Review = db.model('review');

// OB/MS: maybe go with /api/products/:productId/reviews/:reviewId pattern

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
// OB/MS: orphan route handler here
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
    res.send(review[1][0].dataValues); // OB/MS: sequelize will automatically get only the data values when you JSON.stringify which happens when you res.send
  })
})

    // Admin or owner: DELETE
router.delete('/:reviewId', function(req, res, next) {
  // to be set up after sessions
})

module.exports = router;
