'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER
  }
});
