'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');
var User = require('./user');

module.exports = db.define('review', {
    title: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.TEXT
    },
    stars: {
        type: Sequelize.INTEGER
    }
}, {
  defaultScope: {
    include: [User]
  }
});
