'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$http', '$state', 'Restangular', function($scope, $http, $state, Restangular) {
    $scope.user = {};
    $scope.authError = null;
    $scope.signup = function() {
      $scope.authError = null;
      // Try to create
      Restangular.all('account/create').post("user", {name: $scope.user.name, email: $scope.user.email, password: $scope.user.password}).then(function(response) {
        if ( !response.data ) {
          $scope.authError = response;
        }else{
          $state.go('app.dashboard');
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }])
 ;