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

  describe('Create new Products', function () {

   it('should post a book to the database and return us the expected thing', function (done) {
      // OB/MS: check out supertest-as-promised
      agent.post('/api/products/')
      .send(productInfo)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body.title).to.equal(productInfo.title);
        expect(res.body.title).to.equal(productInfo.title); // OB/MS: dups
        done();
      })
    });

  });

  describe('Existing Products', function () {


    beforeEach('Create a product', function (done) {
      return Product.create(productInfo).then(function (product) {
                book = product;
                done(); // OB/MS: drop the dones
            }).catch(done);
    });

    it('should get all, with 200 response and with an array as the body and the correct title', function (done) {
      agent.get('/api/products/')
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        expect(response.body).to.be.an('array');
        // OB/MS: maybe check out chai-things expect(response.body).to.have.a.thing.with.property('title', 'a nice book');
        expect(response.body.some(function(product) {
          return product.title === 'a nice book';
        }), 'Expected title not found').to.equal(true)
        done();
      });
    });

    it('should get one book with 200 response and a book as the body and the correct title', function (done) {
      agent.get('/api/products/' + book.id)
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        expect(response.body).to.be.an('object');
        expect(response.body.title).to.equal(book.title);
        done();
      });
    });

    it('should update the title of a book', function (done) { // OB/MS: I prefer imperative, i.e. drop the 'should's
      let newTitle = 'I am a new title';
      agent.put('/api/products/' + book.id)
      .send({title: newTitle})
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        expect(response.body).to.be.an('object');
        expect(response.body.title).not.to.equal(book.title);
        expect(response.body.title).to.equal(newTitle);
        done();
      });
    });

    it('should persist the change', function (done) {
      let newTitle = 'I am a new title';
      agent.put('/api/products/' + book.id)
      .send({title: newTitle})
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        Product.findById(book.id)
         .then(function(b) {
          expect(b).to.be.an('object');
          expect(b.title).not.to.equal(book.title);
          expect(b.title).to.equal(newTitle);
          done();
        }).catch(done);
      });
    });

    it('should delete a book', function (done) {

      agent.delete('/api/products/' + book.id)
      .expect(204)
      .end(function (err, response) {
        if (err) return done(err);
        Product.findById(book.id)
         .then(function(b) {
          expect(b).to.equal(null);
          done();
        }).catch(done);
      });
    });

  });

});
