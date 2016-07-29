app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'cartCtrl'
    });
});

app.controller('cartCtrl', function($scope, $http, $log, OrderFactory) {

  $scope.addToCart = function(productId, quantity){

    OrderFactory.addItem(null, productId, quantity)
    .then(function(result) {
      console.log("Post the following result to the $scope");
      console.log(result);
    })
    .catch(function(error) {
      console.error(error);
    });
  }

});
