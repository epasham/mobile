'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', 'Restangular', function($scope, $http, $state, Restangular) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      Restangular.all('account/verify').post("users", $scope.user)
      .then(function(response) {
        if ( !response.data ) {
          $scope.authError = 'Email or Password not right';
        } else {
          $scope.user.token = response.data;
          getUSerInfo();
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };

    var getUserInfo = function() {
      Restangular.all('account').post("user", $scope.user.token).then(function(response) {
        $scope.user = response.data;
        $state.go('app.dashboard-v1');
      });
    };

  }])
;

