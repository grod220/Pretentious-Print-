 'use strict';

const router = require('express').Router({mergeParams: true});
const db = require('../../db');
const LineItem = db.model('lineItem');
const Order = db.model('order');
const Product = db.model('product');
let Promise = require('bluebird');

router.post('/', function (req, res, next) {

  let orderId = parseInt(req.params.orderId);
  if (typeof orderId !== "number" || isNaN(orderId)) {
    orderId = req.session.cartId; 
  }

  let gets = [
    Order.findById(orderId), 
    Product.findById(req.params.productId)];
  Promise.all(gets)
  .spread(function(order, product) {
     return order.addProduct(product, {quantity: req.body.quantity, price: product.price});
   })
  .then(function(stuff) {
    console.log(stuff);
    return Order.findById(orderId, {include: [Product]})
  })
  .then(function(gizmo) {
    res.send(gizmo);
  })
  .catch(next);

});

router.put('/:productId', function (req, res, next) {
  console.log('orderId', req.params.orderId);
  console.log('productId', req.params.productId);
  res.end();
});

router.delete('/:productId', function (req, res, next) {});

module.exports = router;
