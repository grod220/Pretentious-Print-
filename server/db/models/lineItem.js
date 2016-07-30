'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

var LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER
  },
  total: {
    type: Sequelize.VIRTUAL,
    get: function () {
      return this.getDataValue('price') * this.getDataValue('quantity');
    }
  }
});

module.exports = LineItem;
