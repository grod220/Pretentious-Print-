 'use strict';

// Setup Stripe for credit card auth
var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

const router = require('express').Router();
const db = require('../../db');
const Order = db.model('order');
const Product = db.model('product');
let Promise = require('bluebird');

router.get('/', function (req, res, next) {
  Order.findById(req.session.cartId)
    .then(function (cart) {
      res.send(cart);
    })
    .catch(next);
});

router.post('/', function (req, res, next) {
  let gets = [
    Order.findById(req.session.cartId),
    Product.findById(req.body.productId)
    ];
  Promise.all(gets)
  .spread(function(order, product) {
     return order.addProduct(product, {quantity: req.body.quantity, price: product.price});
   })
  .then(function () {
    return Order.findById(req.session.cartId);
  })
  .then(function (cart) {
    res.send(cart);
  })
  .catch(next);

});

router.post('/commitOrder', function(req, res, next) {
  stripe.charges.create(req.body.stripeObj) 
  .then(function(charge) {
    console.log('=========  Ready to post updates  =========');
    console.log(req.body.upObj);
    return Order.findById(req.session.cartId)
  })
  .then(function(ord) {
    console.log("------- Got order  -------", ord.id)
    return ord.update(req.body.upObj)
  })
  .then (function(reslt) {
    console.log("....... Update result was", reslt)
    res.status(200).send(reslt);
  })
  .catch(function(err) {
    res.status(401).send(err);
  })  
})



router.put('/:reviewId', function(req, res, next) {
  Order.findById(req.session.cartId)
  .then (function(ord) {
    return ord.update(req.body)
  })
  .then (function (result) {
    req.sen(result)
  })
  .catch(next)
});

router.delete('/product/:productId', function (req, res, next) {
  var arr = [
    Order.findById(req.session.cartId),
    Product.findById(req.params.productId)
  ];

  Promise.all(arr)
    .spread(function (order, product) {
      return order.removeProduct(product);
    })
    .then(function () {
      res.send(204);
    })
    .catch(next);
});

module.exports = router;
