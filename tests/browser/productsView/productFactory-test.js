'use strict';

describe('Product factory', function() {
  beforeEach(module('FullstackGeneratedApp'));

    var fakeProducts = [{
        id: 1,
        price: 12345,
        inventory: 49,
        pretentionLevel: 8,
        title: 'As I Lay Dying',
        author: 'William Faulkner',
        description: 'As certain to impress your monocled friends as it is to send you into a deep slumber, all in an appropriately anachronistic binding.',
        condition: 'Distinguished wear'
    }, {
        id: 2,
        price: 98675,
        inventory: 55,
        pretentionLevel: 2,
        title: 'Jams and Jellys of Nova Scotia',
        author: 'Millicent Dwimple',
        description: 'Low pretention, but suited to a certain clientele',
        condition: 'mint'
    }];
    var newBookWithoutId = {
        price: 2723,
        inventory: 12,
        pretentionLevel: 5,
        title: 'The Celestial Railroad',
        author: 'Nathaniel Hawthorne',
        description: 'A quintessential piece of American sham intellectualism.',
        condition: 'Slightly foxed' 
    }
    
    var newBook = {
        id: 3,
        price: 2723,
        inventory: 12,
        pretentionLevel: 5,
        title: 'The Celestial Railroad',
        author: 'Nathaniel Hawthorne',
        description: 'A quintessential piece of American sham intellectualism.',
        condition: 'Slightly foxed' 
    }
    

  var Product, $httpBackend, fakeReqProduct, fakeResProduct;
  beforeEach(inject(function ($injector) {
    Product = $injector.get('ProductFactory');
    $httpBackend = $injector.get('$httpBackend');
    // fakeReqProduct = fakeProduct;
    // fakeResProduct = {
    //   price: fakeReqProduct.price,
    //   inventory: fakeReqProduct.inventory,
    //   modification: 'something new'
    // };
  }));
  // checks that $httpBackend received and handled all expected calls
  afterEach(function(){
    try {
      $httpBackend.verifyNoOutstandingExpectation(false);
      $httpBackend.verifyNoOutstandingRequest();
    } catch (err) {
      this.test.error(err);
    }
  });

  it('`.getAll` fetches all backend products', function (done) {
    console.log(fakeProducts);
    $httpBackend
      .expect('GET', '/api/products/')
      .respond(200, fakeProducts);
    $httpBackend
      .when('GET', 'js/home/products.html')
      .respond(200);
    Product.getAll()
      .then(function (products) {
        expect(products).to.deep.equal(fakeProducts);
        done();
      })
      .catch(done);
    $httpBackend.flush();
  });

  it('`.getOne` fetches one backend product by id', function (done) {
    $httpBackend
      .expect('GET', '/api/products/1')
      .respond(200, fakeProducts[1]);
    $httpBackend
      .when('GET', 'js/home/products.html')
      .respond(200);
    Product.getOne(1)
      .then(function (products) {
        expect(products).to.deep.equal(fakeProducts[1]);
        done();
      })
      .catch(done);
    $httpBackend.flush();
  });

  it('`.destroy` deletes a product by id', function (done) {
    $httpBackend
      .expect('DELETE', '/api/products/2')
      .respond(204);
    $httpBackend
      .when('GET', 'js/home/products.html')
      .respond(200);
    Product.destroy(2)
      .then(function (result) {
         expect(result).to.equal(undefined); 
        done();
      })
      .catch(done);
    $httpBackend.flush();
  });


  it('`.update` updates one backend product by id', function (done) {
    $httpBackend
      .expect('PUT', '/api/products/2')
      .respond(200, fakeProducts[0]);
    $httpBackend
      .when('GET', 'js/home/products.html')
      .respond(200);
    Product.update(2)
      .then(function (products) {
        expect(products).not.to.deep.equal(fakeProducts[1]);
        done();
      })
      .catch(done);
    $httpBackend.flush();
  });

  it('`.add` adds one backend product', function (done) {
    $httpBackend
      .expect('POST', '/api/products/')
      .respond(201, newBook);
    $httpBackend
      .when('GET', 'js/home/products.html')
      .respond(200);
    Product.add(newBookWithoutId)
      .then(function (product) {
        expect(product).to.deep.equal(newBook);
        done();
      })
      .catch(done);
    $httpBackend.flush();
  });


});
