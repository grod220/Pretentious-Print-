'use strict'

//  Factory for Product manipulation
app.factory('ProductFactory', function($http, $log, Utils) {
    let factory = {};
    let baseRoute = "/api/products/";

    let toData = Utils.toData;

    factory.getOne = function(id) {
        return $http.get(baseRoute + id.toString())
        .then(toData);
    };

    factory.getAll = function() {
        return $http.get(baseRoute)
        .then(toData);
    };


    factory.destroy = function(id) {
        return $http.delete(baseRoute + id.toString())
        .then(toData);
    };

    factory.add = function(prod) {
        return $http.post(baseRoute, prod)
        .then(toData);
    };

    factory.update = function(id, updata) {
        return $http.put(baseRoute + id.toString(), updata)
        .then(toData);
    };

    factory.getReviews = function(id) {
        return $http.get(baseRoute + id.toString() + '/reviews')
        .then(toData);
    };


    return factory;
});
