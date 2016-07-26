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

router.get('/:id', function (req, res, next) {
  Product.findById(req.params.id)
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

router.put('/:id', function (req, res, next) {
  Product.update(req.body, {
    where: req.params,
    returning: true
  })
  .then(function (result) {
    if (result && result[0] > 0) {
      res.send(result[1][0]);
    } else {
      res.sendStatus(404);
    }
  })
  .catch(next);
});

router.delete('/:id', function (req, res, next) {
  Product.destroy({
    where: req.params
  })
  .then(function (result) {
    if (result > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  })
  .catch(next);
});

module.exports = router;
