app.config(function ($stateProvider) { 
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'cartCtrl',
        resolve: {}; //fill in here!
    });
});

app.controller('cartCtrl', function($scope, $state, $http, $log, CartFactory) {
  //Make sure to get unauthenticated users working (local storage?, req.session?)
  // $scope.newQty = 0;
  var getData = function () {
    CartFactory.getCart()
    .then(function (cart) {
      $scope.data = cart; // catching errors in factory => causing false positive in controller
    })
    .catch($log.error); // never gonna get here
  };

  getData(); //should be done with resolve in state definition
  
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
