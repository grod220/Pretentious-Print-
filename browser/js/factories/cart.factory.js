'use strict'

//  Factory for Cart, Order, and Line Item manipulation
app.factory('CartFactory', function($http, $log, Utils) {
    let factory = {};
    let baseRoute = "/api/cart/";

    let toData = Utils.toData;

    factory.getCart = function() {
        return $http.get(baseRoute)
        .then(toData)
        .catch($log.error);
    };

    factory.addItem = function(product, qty) {
        return $http.post(baseRoute,
            {productId: product, quantity: qty})
        .then(toData)
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
            return res;
        })
        .catch(function (err) {
            return err;
        });
    };

    return factory;
});
