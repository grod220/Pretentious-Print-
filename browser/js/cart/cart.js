app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'cartCtrl'
    });
});

app.controller('cartCtrl', function($scope, $http, $log, CartFactory) {
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
      .catch($log.error)
  };
});
