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

app.filter('authorFilter', function() {
  return function(products, author) {
    if (!author) {
      return products;
    }

    return products.filter(function(product) {
      return product.author === author;
    });
  }
});
