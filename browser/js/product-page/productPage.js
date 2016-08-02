app.config(function($stateProvider) {
  $stateProvider.state('productPage', {
    url: '/productPage/:productId',
    templateUrl: 'js/product-page/productPage.html',
    controller: 'productPageCtrl'
  });
});

app.controller('productPageCtrl', function($scope, $log, ProductFactory, $stateParams, CartFactory, growl) {
  $scope.id = $stateParams.productId;

  $scope.addToCart = function(productId, quantity){
    CartFactory.addItem(productId, quantity)
    .then(function() {
      growl.success("Added a splendid work to your cart", {ttl: 4000, disableCountDown: true});
    })
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

  // $scope.starHTML = function(num) {
  //   var toReturn = '';
  //   for (var i=0; i<num; i++) {
  //     toReturn += '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';
  //   }
  //   return toReturn;
  // };
});
