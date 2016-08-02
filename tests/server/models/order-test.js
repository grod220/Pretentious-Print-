'use strict';


var expect = require('chai').expect;
var Bluebird = require('bluebird');
var db = require('../../../server/db');

var Order = db.model('order');
var User = db.model('user');

describe('Order class method', function () {

  //clear the database before all tests
  before(function () {
    return db.sync({force: true});
  });

  // erase all tasks after each spec
  afterEach(function(){
    return db.sync({force: true});
  });


  describe('Class methods', function(){
  let dummyUserId = 7;
  let dummyUser;
  let existing;
  let theUser = {
    id: dummyUserId,
    email: 'Ash@pokemeat.com',
    userName: 'Ash'
  }

  let defOrder = {
    id: 3,
    userId: dummyUserId
  }

   beforeEach(function (done) {
      User.create(theUser)
      .then(function(user) {
        dummyUser = user;
        done();
      })
    });


    describe('getTheCartId', function(){

      it('Creates a new cart if there is not one for that user', function(done){
        return Order.getTheCartId(dummyUser)
          .then(function(result) {
            expect(result).to.equal(1);
            done();
        });
      });

      it('Returns the existing cart if there is one for that user', function(done){
        Order.create(defOrder)
        .then(function(cart) {
          existing = cart;
          Order.getTheCartId(dummyUser)
          .then(function(result) {
            expect(result).to.equal(existing.id);
            done();
          })
        });
      });

    });

  });

});
