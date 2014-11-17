'use strict';

// signup controller
app.controller('NewChildFormController', ['$scope', '$http', '$state', 'Restangular', '$rootScope', 'storage', function($scope, $http, $state, Restangular, $rootScope, storage) {
    $scope.authError = null;
    // $scope.signup = function() {
    //   $scope.authError = null;
    //   // Try to create
    //   Restangular.all('account/create').post("user", {name: $scope.user.name, email: $scope.user.email, password: $scope.user.password}).then(function(response) {
    //     if ( !response.data ) {
    //       $scope.authError = response;
    //     }else{
    //       $state.go('app.dashboard');
    //     }
    //   }, function(x) {
    //     $scope.authError = 'Server Error';
    //   });
    // };
    $scope.newChild = {};
    $scope.user_id = storage.get('user_id');
    $scope.newChild.token = storage.get('token');

    $scope.addChild = function() {
      $scope.success = false;
      $scope.authError = null;
      // Try to create
      var api = Restangular.all('account/'+$scope.user_id+'/child/create/');

      // POST /accounts
      api.post($scope.newChild).then(function(response) {
        if ( response.code == 200 ) {
          $scope.success = true;
          $scope.authError = 'Success!  Please check your email for further instructions.';
        } else if ( response.code == 450 ) {
            $scope.badEmail = true;
            $scope.authError = 'Email address already in use'
        }
      }, function(x) {
        $scope.authError = $scope.response.msg;
      });
    };

  }])
 ;