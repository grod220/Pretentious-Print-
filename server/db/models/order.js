'use strict';
var Sequelize = require('sequelize');
var Promise = require('bluebird');

var db = require('../_db');
var Product = require('./product');

var Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('created','processing', 'canceled','completed'),
    defaultValue: 'created'
  },
  date: {
    type: Sequelize.DATE
  },
  shippingAddress: {
    type: Sequelize.STRING
  },
  billingAddress: {
    type: Sequelize.STRING
  },
  notificationEmail: {
    type: Sequelize.STRING
  }
},
{
  classMethods: {
    getTheCartId: function(userId) {
      return Order.findOrCreate(
        {where: {userId: userId, status: 'created'}})
      .spread(function(order, crt) {
        console.log("------- For user", userId, 'returned order', order.id,
            'Created:', crt);
        return order.id;
      })
    }
  },
  defaultScope: {
     include: [Product]
  }
}
);
module.exports = Order;
