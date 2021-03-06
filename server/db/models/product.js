'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('product', {
    price: {
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    inventory: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0
        }
    },
    image: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        },
        allowNull: true
    },
    pretentionLevel: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    author: {
        type: Sequelize.STRING
    },
    datePublished: {
        type: Sequelize.DATE
    },
    description: {
        type: Sequelize.TEXT
    },
    condition: {
        type: Sequelize.STRING
    }
});
