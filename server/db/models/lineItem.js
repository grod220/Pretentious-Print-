'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

var LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER
  }
});

module.exports = LineItem;
