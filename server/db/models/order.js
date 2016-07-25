'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('order', {
  status: {
    type: Sequelize.ENUM('created','processing', 'canceled','completed')
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
});
