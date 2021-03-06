/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Product = db.model('product');
var Review = db.model('review');
var Order = db.model('order');
var LineItem = db.model('lineItem');

var Promise = require('sequelize').Promise;
var fs = require('fs');
var path = require('path');

function randomNum (num) {
  return Math.floor((Math.random() * num) + 1);
}

var seedStuff = function () {

    var superUsers = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            isAdmin: true,
            twitter_id: 'fsa123',
            facebook_id: 'fsa123',
            google_id: 'fsa123',
            userName: 'FSAissupercool123'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            isAdmin:true,
            twitter_id: 'potusisthemostus',
            facebook_id: 'myfacebookstff',
            google_id: 'potusgooleID',
            userName: 'mrPresident'
        }
    ];

    var jsonOrders = fs.readFileSync(path.join(__dirname, './seedData/ordersSeed.json'), 'utf-8');
    var orders = JSON.parse(jsonOrders);
    var creatingOrders = orders.map(function (orderObj) {
        return Order.create(orderObj);
    });

    var jsonOrders2 = fs.readFileSync(path.join(__dirname, './seedData/ordersSeed-noneActive.json'), 'utf-8');
    var orders2 = JSON.parse(jsonOrders2);
    var creatingOrders2 = orders2.map(function (orderObj) {
        return Order.create(orderObj);
    });

    var jsonReviews = fs.readFileSync(path.join(__dirname, './seedData/reviewsSeed.json'), 'utf-8');
    var reviews = JSON.parse(jsonReviews);
    var creatingReviews = reviews.map(function (reviewObj) {
        return Review.create(reviewObj);
    });

    var jsonUsers = fs.readFileSync(path.join(__dirname, './seedData/usersSeed.json'), 'utf-8');
    var users = JSON.parse(jsonUsers).concat(superUsers);
    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    var jsonGoogle = fs.readFileSync(path.join(__dirname, './seedData/googleAPI.json'), 'utf-8');
    var google = JSON.parse(jsonGoogle);
    var googleLength = google.items.length;

    var jsonProducts = fs.readFileSync(path.join(__dirname, './seedData/productsSeedFinal.json'), 'utf-8');
    var products = JSON.parse(jsonProducts);
    products.forEach(function (product, index) {
      product.image = google.items[index].volumeInfo.imageLinks.thumbnail;
      product.title = google.items[index].volumeInfo.title;
      product.author = google.items[index].volumeInfo.authors[0];
      product.datePublished = Date.parse(google.items[index].volumeInfo.publishedDate);
      product.description = google.items[index].volumeInfo.description;
    });
    var creatingProducts = products.map(function(prodObj) {
        return Product.create(prodObj);
    });

    var jsonLineItems = fs.readFileSync(path.join(__dirname, './seedData/lineItemsSeed.json'), 'utf-8');
    var lineItems = JSON.parse(jsonLineItems);
    lineItems.forEach(function (lineItem) {
      lineItem.orderId = randomNum(100);
      lineItem.productId = randomNum(googleLength);
    });
    var creatingLineItems = lineItems.map(function (lineItemObj) {
        return LineItem.create(lineItemObj);
    });

    return Promise.all(creatingUsers)
      .then(function (users) {
        return Promise.all(creatingProducts);
      })
      .then(function (products) {
        return Promise.all(creatingReviews);
      })
      .then(function (reviews) {
        var arr = reviews.map(function (review) {
          review.setUser(randomNum(100));
          review.setProduct(randomNum(googleLength));
          return review.save();
        });
        return Promise.all(arr);
      })
      .then(function() {
        return Promise.all(creatingOrders);
      })
      .then(function (orders) {
        var arr = orders.map(function (order, index) {
          order.setUser(index+1);
          return order.save();
        });
         return Promise.all(arr);
      })
      .then(function () {
        return Promise.all(creatingOrders2);
      })
      .then(function (orders) {
        var arr = orders.map(function (order, index) {
          order.setUser(index+1);
          return order.save();
        });
         return Promise.all(arr);
      })
      .then(function() {
        return Promise.all(creatingLineItems);
      })
      .then(function () {
        /* do nothing? */
      })
      .catch(console.error);

};

db.sync({ force: true })
    .then(function () {
        return seedStuff();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });


