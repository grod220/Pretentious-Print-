 'use strict';

let router = require('express').Router();
let db = require('../../db');
let Product = db.model('product');

router.get('/', function (req, res, next) {
  Product.findAll()
  .then(function (products) {
    res.send(products);
  })
  .catch(next);
});




module.exports = router;
