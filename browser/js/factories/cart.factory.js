'use strict'

//  Factory for Cart, Order, and Line Item manipulation
app.factory('CartFactory', function($http, $log) {
    let factory = {};
    let baseRoute = "/api/cart/";

    let toData = function(result) { return result.data; }; // maybe inject this function as factory itself for reusability

    factory.getCart = function() {
        return $http.get(baseRoute)
        .then(toData)
        .catch($log.error); // check controller error 
    };

    factory.addItem = function(product, qty) {
        return $http.post(baseRoute,
            {productId: product, quantity: qty})
        .then(function(res) {
            return res.data;
        })
        .catch($log.error);
    };

    factory.removeItem = function (productId) {
      return $http.delete(baseRoute + 'product/' + productId)
        .then(toData)
        .catch($log.error);
    };

    factory.commitOrder = function(stripeObj, upObj) {
        let args={stripeObj: stripeObj, upObj: upObj}
        return $http.post(baseRoute + '/commitOrder', args)
        .then(function(res) {
            return res; //useless
        })
        .catch(function (err) { //refactor to handle 401 separately
            return err;
        });
    };

    return factory;
});
