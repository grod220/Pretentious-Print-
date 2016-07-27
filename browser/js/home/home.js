app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'testController'
    });
});

app.controller('testController', function($scope, $http) {

  $scope.title;
  $scope.description;

  $scope.addToCart = function() {
    var obj = {
      quantity: 2
    };
    console.log('did this work?');
    $http.post('/api/lineItems/1', obj)
    .then(function(result) {
      alert('You just bought' + result.quantity + ' of ' + result.title);
    })
    .catch(function(error) {
      console.error(error);
    });
  };

});
