1app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/cart/checkout.html',
        controller: 'checkoutCtrl'
    });
});

app.controller('checkoutCtrl', function($scope, $http, $log, CartFactory, growl, $state) {
  // $scope.newQty = 0;
  var getData = function () {
    CartFactory.getCart()
    .then(function (cart) {
      $scope.data = cart;
    })
    .catch($log.error);
  };

  getData(); //resove block?
  $scope.zipPattern = "\\d{5}(-\\d{4})?";
  $scope.inProcess = false;
 
 // Handle order placement.
  $scope.placeOrder = function () {
    $scope.inProcess = true;
    let stripeObj = { //check out angular-stripe 
      amount: $scope.data.total,
      currency: "usd",
      source: {
        number:   $scope.buyer.card,
        exp_month: +$scope.buyer.expmo,
        exp_year: +$scope.buyer.expyr,
        cvc:   $scope.buyer.cvc,
        address_city:  $scope.buyer.city,
        address_state:  $scope.buyer.state,
        address_zip:  $scope.buyer.zip,
        address_line1: $scope.buyer.street,
        name:  $scope.buyer.name
      },
      description: "Charge for test@pretentiousprint.com",
    }
    let upObj = {
      stripeAuthorization: JSON.stringify(stripeObj),
      status: 'processing',
      name: $scope.name,
      date: Date.now(),
      shippingAddress: $scope.buyer.street,
      shippingCity: $scope.buyer.city,
      shippingState: $scope.buyer.state,
      shippingZip: $scope.buyer.zip,
      notificationEmail: $scope.buyer.email
    }

    CartFactory.commitOrder(stripeObj, upObj)
    .then(function (res) {
      if (res.status !== 200) { //what would the status be?
        growl.error(res.data.message, {title: res.data.code,ttl: 3000, disableCountDown: true});
        $scope.inProcess = false;
      } else {
        growl.success("The credit card info was accepted", {ttl: 5000, disableCountDown: true});       
        growl.success("Your order has been completed.", {ttl: 7000, disableCountDown: true});
//        $scope.inProcess = false;
        $state.go('home');
      }
    })
  };


});
