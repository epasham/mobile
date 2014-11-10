'use strict';

// verify email controller
app.controller('VerifyEmailController', ['$scope', '$http', '$state', 'Restangular', function($scope, $http, $state, Restangular) {
    $scope.user = {};
    $scope.authError = null;
    $scope.verificationSent = false;
    $scope.verifyEmail = function() {
      $scope.authError = null;
      // Try to create
      Restangular.all('account/resend').post("user", {email: $scope.user.email}).then(function(response) {
        if ( response.data ) {
          $scope.authError = response;
        }else{
          $scope.verificationSent = true;
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }])
 ;