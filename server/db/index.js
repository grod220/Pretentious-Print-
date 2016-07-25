'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Product = require('./models/product');
var Review = require('./models/review');
var Order = require('./models/order');
var LineItem = require('./models/lineItem');

Review.belongsTo(User);
Review.belongsTo(Product);
Product.hasMany(Review);
Order.belongsToMany(Product, {through: LineItem});
Order.belongsTo(User);
