'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

var Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('created','processing', 'canceled','completed'),
    default: 'created'
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
      .then(function(order) {
        console.log('2222 Found or created ordr', order[0]);
        return order[0].id;
      })
    }
  }
}
);

module.exports = Order;
