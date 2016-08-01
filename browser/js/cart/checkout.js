app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/cart/checkout.html',
        controller: 'checkoutCtrl'
    });
});

app.controller('checkoutCtrl', function($scope, $http, $log, CartFactory, growl) {
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
 
 // Handle order placement.
  $scope.placeOrder = function () {

    let stripeObj = {
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

    CartFactory.getCcAuth(stripeObj)
    .then(function (res) {
      if (res.status !== 200) {
        growl.error(res.data.message, {title: res.data.code,ttl: 3000, disableCountDown: true})
      } else {
        growl.success("The credit card info was accepted", {ttl: 3000, disableCountDown: true});
        commitOrder(res.data)
      }
    })
  };

  CartFactory.commitOrder = function(authObj) {
    // Set cart status to processing; no longer updateable
    let upObj = {
      stripeAuthorization: JSON.stringify(authObj),
      status: 'processing',
      
    }
  }


});
