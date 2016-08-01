app.config(function($stateProvider) {
  $stateProvider.state('productPage', {
    url: '/productPage/:productId',
    templateUrl: 'js/product-page/productPage.html',
    controller: 'productPageCtrl'
  });
});

app.controller('productPageCtrl', function($scope, $log, ProductFactory, $stateParams, CartFactory) {
  $scope.id = $stateParams.productId;

  $scope.addToCart = function(productId, quantity){
    CartFactory.addItem(productId, quantity)
    .catch($log.error);
  };

  ProductFactory.getOne($scope.id)
  .then(function(product) {
    $scope.data = product;
    return ProductFactory.getReviews($scope.id)
  })
  .then(function(reviews) {
    $scope.data.reviews = reviews;
  })
  .catch($log.error);

})
