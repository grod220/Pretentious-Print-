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
    console.log("====== I came back from getCcAuth with", res);
  })

  /*

stripe.charges.create({
  amount: $scope.data.total / 100,
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
}, function(err, charge) {
  // asynchronously called
});

  $scope.buyer.name
  $scope.buyer.email
  $scope.buyer.street
  $scope.buyer.city
  $scope.buyer.state
  $scope.buyer.zip
  $scope.buyer.card
  $scope.buyer.expmo
  $scope.buyer.expyr
  $scope.buyer.cvc
*/






    console.log("User placed the order!");
    console.log($scope);
  };


/*

          <tr><td>Name</td><td><input type="text" ng-model="buyer.name" ng-required="true"/></td></tr>
          <tr><td>E-mail</td><td><input type="email" ng-model="buyer.email" ng-required="true"/></td></tr>
          <tr><td>Street address</td><td><input type="text" ng-model="buyer.street" ng-required="true"/></td></tr>
          <tr><td>City</td><td><input type="text" ng-model="buyer.city" ng-required="true"/></td></tr>
          <tr><td>State</td><td><input type="text" ng-model="buyer.state" ng-required="true" /></td></tr>
          <tr><td>Zip</td><td><input type="text" ng-model="buyer.zip"  ng-pattern="zipPattern" ng-required="true"/></td></tr>
          <tr><td> </td><td> </td></tr>
          <tr><td>Credit Card Number</td><td><input type="number" ng-model="buyer.card" ng-required="true" /></td></tr>
         <tr><td>Expiration month</td><td><input type="number" ng-model="buyer.expmo" ng-required="true" /></td></tr>
         <tr><td>Expiration year</td><td><input type="number" ng-model="buyer.expyr" ng-required="true" /></td></tr>
         <tr><td>cvc</td><td><input type="text" ng-model="buyer.cvc" ng-required="true" /></td></tr>

*/







});
