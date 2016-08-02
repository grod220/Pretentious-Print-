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
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.DATE
  },
  shippingAddress: {
    type: Sequelize.STRING
  },
  shippingCity: {
    type: Sequelize.STRING
  },
  shippingState: {
    type: Sequelize.STRING
  },
  shippingZip: {
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
  sessionID: {
    type: Sequelize.STRING
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
    getTheCartId: function(user, sessionID) {
      if(user && user.id) {
        return Order.findOrCreate(
          {where: {userId: userId, status: 'created'},
            defaults: {sessionId: null}})
        .spread(function(order, crt) {
  console.log("Returning cart", order.id, "by userid", user.id)
          return order.id;
        })
      } else {
        return Order.findOrCreate(
          {where: {sessionID: sessionID, status: 'created'},
          defaults: {userID: null}})
        .spread(function(order, crt) {
    console.log("Returning cart", order.id, "by session", sessionID)
                  return order.id;
        })

      }
    }
  },
  defaultScope: {
     include: [Product]
  }
}
);
module.exports = Order;
