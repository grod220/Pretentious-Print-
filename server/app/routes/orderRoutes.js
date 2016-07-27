 'use strict';

const router = require('express').Router();
const db = require('../../db');
const Order = db.model('order');



// get All orders
router.get('/', function (req, res, next) {});

// get an order & details by Orderid
router.get('/:id', function (req, res, next) {});

// get all orders & details by UserId
// OB/MS: maybe instead /api/users/:userId/orders
router.get('/user/:userId', function (req, res, next) {});

// update an order
router.put('/:id', function (req, res, next) {});

// delete an order
router.delete('/:id', function (req, res, next) {});



module.exports = router;
