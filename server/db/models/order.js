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
  name: {
    type: Sequelize.string,
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
  },
  stripeAuthorization: {
    type: Sequelize.TEXT
  },
  total: {
    type: Sequelize.VIRTUAL,
    get: function () {
      return this.products.reduce(function (prev, curr) {
        return prev + curr.lineItem.total;
      }, 0);
    }
  }
},
{
  classMethods: {
    getTheCartId: function(userId) {
      return Order.findOrCreate(
        {where: {userId: userId, status: 'created'}})
      .spread(function(order, crt) {
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
