'use strict'

//  Factory for Cart, Order, and Line Item manipulation
app.factory('OrderFactory', function($http, $log) {
    let factory = {};
    let baseRoute = "/api/orders/";

    let toData = function(result) { return result.data; };

    return factory;
});
