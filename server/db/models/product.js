'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('product', {
    price: {
        type: Sequelize.DECIMAL, // OB/MS: cents
        allowNull: true
    },
    inventory: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0 // OB/MS: <3
        }
    },
    image: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true // OB/MS: <3<3
        },
        allowNull: true
    },
    pretentionLevel: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 10 // OB/MS: clearly you haven't met Peter Lynn :)
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
        type: Sequelize.STRING // OB/MS: TEXT is probably best
    },
    condition: { // OB/MS: consider enum
        type: Sequelize.STRING
    }
});
