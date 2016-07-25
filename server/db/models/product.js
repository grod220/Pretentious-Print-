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
        }
    },
    pretentionLevel: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 10
        }
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
        type: Sequelize.STRING
    },
    condition: {
        type: Sequelize.STRING
    }
});
