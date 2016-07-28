app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/products.html',
        controller: 'homeCtrl'
    });
});

app.controller('homeCtrl', function($scope, $http) {

  $scope.quantity;

  $http.get('/api/products')
  .then(function(result) {
    $scope.products = result.data;
  })

  $scope.addToCart = function(productId, quantity) {

    $http.post('/api/orders/myleftfoot/items/' + productId, {
      quantity: quantity
    })
    .then(function(result) {
      console.log("The result was");
      console.log(result);
    })
    .catch(function(error) {
      console.error(error);
    });
  };

});
