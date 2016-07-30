app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/products.html',
        controller: 'homeCtrl'
    });
});

app.controller('homeCtrl', function($scope, $http, $log, CartFactory, ProductFactory) {

  ProductFactory.getAll()
  .then(function(result) {
     $scope.products = result;
  });

  $scope.addToCart = function(productId, quantity){
    CartFactory.addItem(productId, quantity)
    .catch($log.error);
  };

});
