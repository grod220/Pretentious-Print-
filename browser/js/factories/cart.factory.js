'use strict'

//  Factory for Cart, Order, and Line Item manipulation
app.factory('CartFactory', function($http, $log) {
    let factory = {};
    let baseRoute = "/api/cart/";

    let toData = function(result) { return result.data; };

    factory.getCart = function() {
        return $http.get(baseRoute)
        .then(toData)
        .catch($log.error);
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
            console.log(">> cartFactory is returning", res)
            return res;
        })
        .catch(function (err) {
            console.log(">> cartFactory is erroring", err)
            return err;
        });
    };

    return factory;
});
