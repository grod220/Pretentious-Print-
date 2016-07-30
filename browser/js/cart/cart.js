app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'cartCtrl'
    });
});

app.controller('cartCtrl', function($scope, $state, $http, $log, CartFactory) {
  CartFactory.getCart()
    .then(function (cart) {
      console.log(cart);
      $scope.data = cart;
    })
    .catch($log.error);

  $scope.removeItem = function (productId) {
    CartFactory.removeItem(productId)
      .then(function (result) {
        $state.go('cart');
      })
      .catch($log.error)
  };
});
