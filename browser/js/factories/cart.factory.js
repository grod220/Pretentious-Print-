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

    factory.addItem = function(cart, product, qty) {
        return $http.post(baseRoute,
            {productId: product, quantity: qty})
        .then(function(res) {
            return res.data;
        })
        .catch($log.error)
    };

    factory.removeItem = function (productId) {
      return $http.delete(baseRoute + 'product/' + productId)
        .then(toData)
        .catch($log.error);
    };

    return factory;
});
