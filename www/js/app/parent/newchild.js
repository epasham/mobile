'use strict';

// signup controller
app.controller('NewChildFormController', ['$scope', '$http', '$state', 'Restangular', '$rootScope', function($scope, $http, $state, Restangular, $rootScope) {
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
    $scope.newChild.token = $rootScope.token;

    $scope.addChild = function() {
      $scope.success = false;
      $scope.authError = null;
      // Try to create
      var api = Restangular.all('account/'+$rootScope.user_id+'/child/create/');

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