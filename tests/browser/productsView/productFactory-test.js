'use strict';

describe('Product factory', function() {
  beforeEach(module('FullstackGeneratedApp'));

    var fakeProducts = [{
        price: 12345,
        inventory: 49,
        pretentionLevel: 8,
        title: 'As I Lay Dying',
        author: 'William Faulkner',
        description: 'As certain to impress your monocled friends as it is to send you into a deep slumber, all in an appropriately anachronistic binding.',
        condition: 'Distinguished wear'
    }, {
        price: 98675,
        inventory: 55,
        pretentionLevel: 2,
        title: 'Jams and Jellys of Nova Scotia',
        author: 'Millicent Dwimple',
        description: 'Low pretention, but suited to a certain clientele',
        condition: 'mint'
    }];

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
      .expect('GET', 'js/home/products.html')
      .respond(200, {});
    Product.getAll()
      .then(function (products) {
        expect(products).to.deep.equal(fakeProducts);
        done();
      })
      .catch(done);
    $httpBackend.flush();
  });
});
