// Instantiate all models
var expect = require('chai').expect;
var Promise = require('bluebird');

var Sequelize = require('sequelize');

var db = require('../../../server/db');
var Product = db.model('product');

var supertest = require('supertest');

describe('Review Route', function () {

    var app, Review, book, review1, review2;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        Review = db.model('review');
        return Product.create({
            price: 65,
            inventory: 20,
            image: 'goodyimages.com/prudentious',
            title: 'The Goody Two Shoes',
            author: 'Hyrum Boregard',
            datePublished: '7-4-1872',
            description: 'oh the most scrupulous of prose',
            condition: 'properly weathered'
          })
          .then(function(b) {
            book = b;
            review1 = {
                  title: 'Awful!@$^',
                  body: 'this was no where near pretentious enough. It is tomfoolery. I want a 300% refund, nooooow! And a written apology',
                  stars: 2,
                  productId: book.id
                };
            review2 = {
                  title: 'Splendid. Ponderous. Rich.',
                  body: 'Causes pontification of a rich and deep nature. Lowly minds would be beneath it.',
                  stars: 5,
                  productId: book.id
                };
          });
    });





  describe('POST', function () {

    var guestAgent;

    beforeEach('Create guest agent', function () {
      guestAgent = supertest.agent(app);
    });

    it('creates a new review', function (done) {
      guestAgent.post('/api/products/' + book.id + '/reviews')
        .send({
          title: 'Awful!@$^',
          body: 'this was no where near pretentious enough. It is tomfoolery. I want a 300% refund, nooooow! And a written apology',
          stars: 2
        })
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body.title).to.equal('Awful!@$^');
          expect(res.body.body).to.equal('this was no where near pretentious enough. It is tomfoolery. I want a 300% refund, nooooow! And a written apology');
          expect(res.body.stars).to.equal(2);
          expect(res.body.id).to.exist;
          Review.findById(res.body.id)
          .then(function(b) {
            expect(b).to.not.be.null;
            done();
          })
          .catch(done);
        });
    });

  });

  describe('GET all', function () {

    var guestAgent;



    beforeEach('Create guest agent', function () {
      guestAgent = supertest.agent(app);
      Promise.all([
        Review.create(review1),
        Review.create(review2)
      ])
      .spread(function(review1,review2) {
      });
    });

    it('retrieves all reviews for product by ID', function (done) {
      guestAgent.get('/api/products/' + book.id + '/reviews')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.be.instanceof(Array);
        expect(res.body).to.have.length(2);
        done();
      });
    });

  });

  // describe('Authenticated request', function () {

  //   var loggedInAgent;

  //   var userInfo = {
  //     email: 'joe@gmail.com',
  //     password: 'shoopdawoop'
  //   };

  //   beforeEach('Create a user', function (done) {
  //     return User.create(userInfo).then(function (user) {
  //               done();
  //           }).catch(done);
  //   });

  //   beforeEach('Create loggedIn user agent and authenticate', function (done) {
  //     loggedInAgent = supertest.agent(app);
  //     loggedInAgent.post('/login').send(userInfo).end(done);
  //   });

  //   it('should get with 200 response and with an array as the body', function (done) {
  //     loggedInAgent.get('/api/members/secret-stash').expect(200).end(function (err, response) {
  //       if (err) return done(err);
  //       expect(response.body).to.be.an('array');
  //       done();
  //     });
  //   });

  // });

});
