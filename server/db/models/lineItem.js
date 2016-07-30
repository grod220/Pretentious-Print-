'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

var LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
        min: 1
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  total: {
    type: Sequelize.VIRTUAL,
    get: function () {
      return this.getDataValue('price') * this.getDataValue('quantity');
    }
  }
});

module.exports = LineItem;
