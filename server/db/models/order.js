'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

// OB/MS: consider more validations!
var Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('created','processing', 'canceled','completed'),
    default: 'created'
  },
  date: {
    type: Sequelize.DATE
  },
  shippingAddress: {
    type: Sequelize.STRING // OB/MS: consider address model
  },
  billingAddress: {
    type: Sequelize.STRING
  },
  notificationEmail: {
    type: Sequelize.STRING // OB/MS: is this an email address?
  }
},
{
  classMethods: {
    getTheCartId: function(userId) {
      return Order.findOrCreate(
        {where: {userId: userId, status: 'created'}})
      .then(function(order) {
        console.log('2222 Found or created ordr', order[0]); // OB/MS: bury dead code
        return order[0].id; // OB/MS: could use .spread instead
      })
    }
  }
}
);

module.exports = Order;
