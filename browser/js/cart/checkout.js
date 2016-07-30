app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/cart/checkout.html',
        controller: 'checkoutCtrl'
    });
});

app.controller('checkoutCtrl', function($scope, $http, $log, CartFactory) {
  // $scope.newQty = 0;
  var getData = function () {
    CartFactory.getCart()
    .then(function (cart) {
      $scope.data = cart;
    })
    .catch($log.error);
  };

  getData();
  $scope.zipPattern = "\\d{5}(-\\d{4})?";

  $scope.placeOrder = function () {
    console.log("User placed the order!");
    console.log($scope);
  };


});
