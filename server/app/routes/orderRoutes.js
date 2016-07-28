 'use strict';

const router = require('express').Router();
const db = require('../../db');
const Order = db.model('order');

router.use('/:orderId/items', require('./lineItemRoutes'));


// get All orders
router.get('/', function (req, res, next) {});

// get an order & details by Orderid
router.get('/:orderId', function (req, res, next) {});

// update an order
router.put('/:orderId', function (req, res, next) {});

// delete an order
router.delete('/:orderId', function (req, res, next) {});




module.exports = router;
