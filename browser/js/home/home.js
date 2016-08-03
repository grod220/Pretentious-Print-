app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/products.html',
        controller: 'homeCtrl'
    });
});

app.controller('homeCtrl', function($scope, $http, $log, CartFactory, ProductFactory, growl) {

  $scope.quantity = 1;

  $scope.priceRanges = ['', '$25 or less', '$25-50', '$50-75', '$75 or more'];

  ProductFactory.getAll()
  .then(function(result) {
     $scope.products = result;
  });

  $scope.addToCart = function(productId, quantity){
    CartFactory.addItem(productId, quantity)
    .then(function() {
      growl.success("Added a splendid work to your cart", {ttl: 4000, disableCountDown: true});
    })
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

app.filter('addDeselect', function() {
  return function(products) {
    products.unshift("");
    return products;
  }
})

app.filter('productFilter', function() {
  return function(products, author, pretention, condition, price) {
    if (!author && !pretention && !condition && !price) {
      return products;
    }

    var onePrice, twoPrice, priceArr;

    if (price) {
      priceArr = price.split("-");
      if (priceArr.length === 1) {
        onePrice = +(priceArr[0].slice(1, 3));
      } else {
        twoPrice = priceArr.map(function(value) {
          return +(value.slice(-2));
        })
      }
    }

    return products.filter(function(product) {
      var aBool = author ? product.author === author : true;
      var pBool = pretention ? product.pretentionLevel == pretention : true;
      var cBool = condition ? product.condition === condition : true;
      var priceBool;
      if (price) {
        if (onePrice) {
          priceBool = onePrice === 25 ? (product.price / 100) < onePrice : (product.price / 100) >= onePrice;
        } else {
          priceBool = (product.price / 100) < twoPrice[1] && (product.price / 100) >= twoPrice[0]
        }
      } else {
        priceBool = true;
      }

      return aBool && pBool && cBool && priceBool;
    })
  }
})
