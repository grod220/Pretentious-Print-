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
// OB/MS: might also want Order.hasMany(LineItem) in order to have methods like order.addLineItem(...) that should e.g. accept a quantity
Order.belongsTo(User);
