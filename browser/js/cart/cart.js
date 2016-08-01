app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'cartCtrl'
    });
});

app.controller('cartCtrl', function($scope, $state, $http, $log, CartFactory) {
  // $scope.newQty = 0;
  var getData = function () {
    CartFactory.getCart()
    .then(function (cart) {
      $scope.data = cart;
    })
    .catch($log.error);
  };

  getData();
  
  $scope.removeItem = function (productId) {
    CartFactory.removeItem(productId)
      .then(getData)
      .catch($log.error);
  };

  $scope.changeQuantity = function (productId, newQuantity) {
    CartFactory.addItem(productId, newQuantity)
    .then(getData)
    .catch($log.error);
  };  

  $scope.toCheckout = function() {
    $state.go('checkout');
  }
});
