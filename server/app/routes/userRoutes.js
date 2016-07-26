 'use strict';

let router = require('express').Router();
let db = require('../../db');
let User = db.model('user');


// delete a user *ADMIN*
// set a current user to admin *ADMIN*
// fetch all users *ADMIN*
// update user info

// fetch a single user by ID
router.get('/:id', function(req,res,next) {
  User.findById({
    where: {
      id: req.params.id
    }
  })
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
  });
});

module.exports = router;
