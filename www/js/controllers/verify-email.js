'use strict';

// verify email controller
app.controller('VerifyEmailController', ['$scope', '$http', '$state', 'Restangular', function($scope, $http, $state, Restangular) {
    $scope.user = {};
    $scope.authError = null;
    $scope.verificationSent = false;
    $scope.verifyEmail = function() {
      $scope.success = false;
      $scope.authError = null;
      // Try to create
      var api = Restangular.all('account/resend');


      // POST /accounts
      api.post({email_address: $scope.user.email}).then(function(response) {
        if ( response.code == 200 ) {
          $scope.success = true;
          $scope.authError = 'Success!  Please check your email for further instructions.';
        }else{
          $scope.verificationSent = true;
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }])
 ;