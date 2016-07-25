'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Product = require('./models/products');
var Review = require('./models/review');
var Order = require('./models/order');
var Cart = require('./models/cart');
var LineItem = require('./models/lineItem');

User.belongsTo(Review);
Product.belongsToMany(Review, {through: 'ProductReviews'});
Review.belongsTo(Product);
Cart.belongsTo(User);
Product.belongsToMany(LineItem, {through: 'LineItemProduct'});
LineItem.belongsToMany(Cart, {through: 'CartLineItem'});
Order.belongsToMany(Cart, {through: 'CartOrder'});

