// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var supertest = require('supertest');

describe('Products Route', function () {

    var agent;
    var book;

    var productInfo = {
      price: 100,
      inventory: 10,
      image: 'http://lorempixel.com/400/200',
      pretentionLevel: 3,
      title: 'a nice book',
      author: 'James Joyce'
    };


    var app, Product;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app and client agent', function () {
        app = require('../../../server/app')(db);
        Product = db.model('product');
        agent = supertest.agent(app);
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

  describe('Create new Products', function () {

   it('should post a book to the database and return us the expected thing', function (done) {
      agent.post('/api/products/')
      .send(productInfo)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body.title).to.equal(productInfo.title);
        expect(res.body.title).to.equal(productInfo.title);
        done();
      })
    });

  });

  describe('Existing Products', function () {


    beforeEach('Create a product', function (done) {
      return Product.create(productInfo).then(function (product) {
                book = product;
                done();
            }).catch(done);
    });

    it('should get all, with 200 response and with an array as the body and the correct title', function (done) {
      agent.get('/api/products/')
      .expect(200).end(function (err, response) {
        if (err) return done(err);
        expect(response.body).to.be.an('array');
        expect(response.body.some(function(product) {
          return product.title === 'a nice book';
        }), 'Expected title not found').to.equal(true)
        done();
      });
    });

    it('should get one book with 200 response and a book as the body and the correct title', function (done) {
      agent.get('/api/products/' + book.id)
      .expect(200).end(function (err, response) {
        if (err) return done(err);
        expect(response.body).to.be.an('object');
        expect(response.body.title).to.equal(book.title);
        done();
      });
    });

    it('should get one book with 200 response and a book as the body and the correct title', function (done) {
      agent.get('/api/products/' + book.id)
      .expect(200).end(function (err, response) {
        if (err) return done(err);
        expect(response.body).to.be.an('object');
        expect(response.body.title).to.equal(book.title);
        done();
      });
    });
  });

});
