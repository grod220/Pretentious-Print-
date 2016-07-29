'use strict'

//  Factory for Cart, Order, and Line Item manipulation
app.factory('OrderFactory', function($http, $log) {
    let factory = {};
    let baseRoute = "/api/orders/";

    let toData = function(result) { return result.data; };

    factory.getOne = function(id) {
        return $http.get(baseRoute + id.toString())
        .then(toData)
        .catch($log.error);
    };

    factory.getAll = function() {
        return $http.get(baseRoute)
        .then(toData)
        .catch($log.error);
    };


    factory.destroy = function(id) {
        return $http.delete(baseRoute + id.toString())
        .then(toData)
        .catch($log.error);
    };

    factory.add = function(ord) {
        return $http.post(baseRoute, ord)
        .then(toData)
        .catch($log.error);
    };

    factory.update = function(id, updata) {
        return $http.put(baseRoute + id.toString(), updata)
        .then(toData)
        .catch($log.error);
    };

    factory.addItem = function(cart, product, qty) {
        return $http.post(baseRoute + 'myleftfoot/items/' + product.toString(), 
            {quantity: qty})
        .then(function(res) {
            return res.data;
        })
        .catch($log.error)
    };

    return factory;
});
