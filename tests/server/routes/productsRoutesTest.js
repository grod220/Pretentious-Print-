// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var supertest = require('supertest');

describe('Products Route', function () {

    var app, Product;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        Product = db.model('product');
    });

  // describe('Unauthenticated request', function () {

  //   var guestAgent;

  //   beforeEach('Create guest agent', function () {
  //     guestAgent = supertest.agent(app);
  //   });

  //   it('should get a 401 response', function (done) {
  //     guestAgent.get('/api/members/secret-stash')
  //       .expect(401)
  //       .end(done);
  //   });

  // });

  describe('Existing Products', function () {

    var agent;

    var productInfo = {
      price: 100,
      inventory: 10,
      image: 'http://lorempixel.com/400/200',
      pretentionLevel: 3,
      title: 'a nice book',
      author: 'James Joyce'
    };

    beforeEach('Create a product', function (done) {
      return Product.create(productInfo).then(function (product) {
                done();
            }).catch(done);
    });

    beforeEach('Create a client agent', function (done) {
      agent = supertest.agent(app);
      done();
    });

    it('should get with 200 response and with an array as the body', function (done) {
      agent.get('/api/products/').expect(200).end(function (err, response) {
        if (err) return done(err);
        expect(response.body).to.be.an('array');
        expect(response.body)
        done();
      });
    });

  });

});
