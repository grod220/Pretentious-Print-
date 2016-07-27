 'use strict';

let router = require('express').Router();
let db = require('../../db');
let User = db.model('user');


// delete a user *ADMIN*
// set a current user to admin *ADMIN*
// trigger password reset *ADMIN*

// fetch a single user by ID
router.get('/:id', function(req,res,next) {
  User.findById(req.params.id)
  .then(function(result) {
    res.send(result);
  })
  .catch(next);
});

// create a new user
router.post('/', function(req,res,next) {
  User.create(req.body)
  .then(function(result) {
    res.send(result);
  })
  .catch(next);
});

// update user info
router.put('/:id', function(req,res,next) {
  User.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
  .then(function(result) {
    res.send(result[1][0].dataValues);
  })
  .catch(next);
});

module.exports = router;
