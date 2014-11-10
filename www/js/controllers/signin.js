'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', 'Restangular', function($scope, $http, $state, Restangular) {
    $scope.user = {};
    $scope.authError = null;
    // $scope.login = function() {
    //   $scope.authError = null;
    //   // Try to login
    //   Restangular.all('account/verify').post("users", $scope.user)
    //   .then(function(response) {
    //     if ( !response.data ) {
    //       $scope.authError = 'Email or Password not right';
    //     } else {
    //       $scope.user.token = response.data;
    //       getUSerInfo();
    //     }
    //   }, function(x) {
    //     $scope.authError = 'Server Error';
    //   });
    // };
    $scope.login = function() {
      $scope.success = false;
      $scope.authError = null;
      // Try to create
      var api = Restangular.all('account/verify');


      // POST /accounts
      api.post({email_address: $scope.user.email, password: $scope.user.password}).then(function(response) {
        $scope.analysis = response;
        if ( !response.token ) {
          $scope.success = false;
          $scope.authError = 'Fail';
        }else{
          $scope.user.token = response.token;
          $scope.user.id = response.user_id;
           Restangular.all('account').get($scope.user.id+'/', {token: $scope.user.token}).then(function(response) {
            $scope.user = response.user;
            $state.go('app.dashboard');
          });
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };

  }])
;

