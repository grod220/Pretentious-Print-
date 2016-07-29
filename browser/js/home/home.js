app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/products.html',
        controller: 'homeCtrl'
    });
});

app.controller('homeCtrl', function($scope, $http, $log, CartFactory, ProductFactory) {

  $scope.quantity;

  ProductFactory.getAll()
  .then(function(result) {
     $scope.products = result;
  })

  $scope.addToCart = function(productId, quantity){

    CartFactory.addItem(null, productId, quantity)
    .then(function(result) {
      console.log("Post the following result to the $scope");
      console.log(result);
    })
    .catch(function(error) {
      console.error(error);
    });
  }

    //  $http.post('/api/orders/myleftfoot/items/' + productId,
    //       {quantity: quantity})
    // .then(function(result) {
    //   console.log("The result was");
    //   console.log(result);
    // })
    // .catch(function(error) {
    //   console.error(error);
    // });
    // }

});
