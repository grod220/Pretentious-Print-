'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('review', {
    title: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.STRING // OB/MS: TEXT is arbitrary length
    },
    stars: {
        type: Sequelize.INTEGER // OB/MS: min/max?
    }
});
