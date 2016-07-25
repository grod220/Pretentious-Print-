'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('review', {
    title: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.STRING
    },
    stars: {
        type: Sequelize.INTEGER
    }
});
