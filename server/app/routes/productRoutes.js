 'use strict';

let router = require('express').Router();
let db = require('../../db');
let Product = db.model('product');
let Promise = require('bluebird');

router.use('/:productId/reviews', require('./reviewRoutes'));

router.get('/', function (req, res, next) {
  Product.findAll()
  .then(function (products) {
    res.send(products);
  })
  .catch(next);
});

router.get('/:productId', function (req, res, next) {
  Product.findById(req.params.productId)
  .then(function (product) {
    res.send(product);
  })
  .catch(next);
});

router.post('/', function (req, res, next) {
  Product.create(req.body)
  .then(function (result) {
    res.status(201).send(result);
  })
  .catch(next);
});

router.put('/:productId', function (req, res, next) {
  Product.update(req.body, {
    where: {id: req.params.productId},
    returning: true
  })
  .spread(function (count, result) {
    if (count > 0) {
      res.send(result[0]);
    } else {
      res.sendStatus(404);
    }
  })
  .catch(next);
});

router.delete('/:productId', function (req, res, next) {
  Product.findById(req.params.productId)
  .then(function(result) {
    if (!result) {
      res.sendStatus(404);
    } else {
      result.destroy()
      .then(function () {
        res.sendStatus(204);
      })
    }
  })
  .catch(next);
});

module.exports = router;
