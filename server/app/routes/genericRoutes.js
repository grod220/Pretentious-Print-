 'use strict';

let router = require('express').Router();
let db = require('../../db');
let Model;


router.get('/:model', function (req, res, next) {
  console.log('--- Got to the get-all generic.  params', req.params);
  Model = db.model(req.params.model);
  console.log('--- Found the model', Model);
  Model.findAll()
  .then(function (products) {
    res.send(products);
  })
  .catch(next);
});

router.get('/:model/:id', function (req, res, next) {
  Model = db.model(req.params.model);
  Model.findById(req.params.id)
  .then(function (product) {
    res.send(product);
  })
  .catch(next);
});

router.post('/:model', function (req, res, next) {
  Model = db.model(req.params.model);
  Model.create(req.body)
  .then(function (result) {
    res.status(201).send(result);
  })
  .catch(next);
});

router.put('/:model/:id', function (req, res, next) {
  Model = db.model(req.params.model);
  Model.update(req.body, {
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

router.delete('/:model/:id', function (req, res, next) {
  Model = db.model(req.params.model);
  Model.destroy({
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
