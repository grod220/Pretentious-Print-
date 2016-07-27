 'use strict';

const router = require('express').Router();
const db = require('../../db');
const LineItem = db.model('lineItem');

// OB/MS: might not want/need line item routes, maybe POST /api/orders/cart/items

router.post('/:orderId', function (req, res, next) {
  console.log('I recieved a order' + req.body);
  res.end();
});

router.put('/:orderId/:productId', function (req, res, next) {
  console.log('orderId', req.params.orderId);
  console.log('productId', req.params.productId);
  res.end();
});

router.delete('/:orderId/:productId', function (req, res, next) {});

module.exports = router;
