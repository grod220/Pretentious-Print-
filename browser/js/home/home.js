app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/products.html',
        controller: 'homeCtrl'
    });
});

app.controller('homeCtrl', function($scope, $http, $log, CartFactory, ProductFactory) {

  $scope.quantity = 1;

  ProductFactory.getAll()
  .then(function(result) {
     $scope.products = result;
  });

  $scope.addToCart = function(productId, quantity){
    CartFactory.addItem(productId, quantity)
    .catch($log.error);
  };

});

app.filter('unique', function() {
  return function(products, property) {
    if (products === undefined) { return; }
    var output = [];
    products.forEach(function(product) {
      var add = true;
      for (var i = 0; i < output.length; i++) {
        if (output[i][property] === product[property]) {
          add = false;
        }
      }
      if (add) {
        output.push(product);
      }
    });
    return output;
  }
});

app.filter('productFilter', function() {
  return function(products, author, pretention, condition) {
    if (!author && !pretention && !condition) {
      return products;
    }

    return products.filter(function(product) {
      var aBool = author ? product.author === author : true;
      var pBool = pretention ? product.pretentionLevel == pretention : true;
      var cBool = condition ? product.condition === condition : true;

      return aBool && pBool && cBool;
    })
  }
})
