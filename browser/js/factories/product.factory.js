'use strict'

//  Factory for Product manipulation
app.factory('ProductFactory', function($http, $log) {
    let factory = {};
    let baseRoute = "/api/products/";

    let toData = function(result) { return result.data; };

    factory.getOne = function(id) {
        return $http.get(baseRoute + id.toString())
        .then(toData)
        .catch($log.error);
    };

    factory.getAll = function() {
        return $http.get(baseRoute)
        .then(function(data) {
            return data.data;
        })
        // .catch($log.error);
    };


    factory.destroy = function(id) {
        return $http.delete(baseRoute + id.toString())
        .then(toData)
        .catch($log.error);
    };

    factory.add = function(prod) {
        return $http.post(baseRoute, prod)
        .then(toData)
        .catch($log.error);
    };

    factory.update = function(id, updata) {
        return $http.put(baseRoute + id.toString(), updata)
        .then(toData)
        .catch($log.error);
    };


    return factory;
});
