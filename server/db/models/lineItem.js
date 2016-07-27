'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

// OB/MS: validations!
module.exports = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.DECIMAL // OB/MS: go for INTEGER and cents to avoid floating point problems
  }
});
