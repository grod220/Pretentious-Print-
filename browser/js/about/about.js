app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        controller: 'AboutController',
        templateUrl: 'js/about/about.html'
    });

});

app.controller('AboutController', function ($scope, FullstackPics, ProductFactory) {

    // Images of beautiful Fullstack people.
    ProductFactory.getAll()
      .then(function(products) {
        $scope.images = products.map(function(prod) {
          return prod.image;
        })
      })

});
