app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'cartCtrl'
    });
});

app.controller('cartCtrl', function($scope, $http, $log, CartFactory) {
  CartFactory.getCart()
    .then(function (cart) {
      console.log(cart);
      $scope.data = cart;
    })
    .catch($log.error);

  $scope.orderTotal = function () {
    var total = 0;
    $scope.data.products.forEach(function (product) {
      total += product.lineItem.price + product.lineItem.quantity;
    });

    return total / 100;
  };

  // $scope.orderTotal = function () {
  //   return $scope.data.products.reduce(function (prev, curr) {
  //     return prev + (curr.lineItem.price * curr.lineItem.quantity);
  //   }, 0) / 100;
  // };
});
