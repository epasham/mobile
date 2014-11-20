'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$http', '$state', 'Restangular', function($scope, $http, $state, Restangular) {
    $scope.user = {
        first_name: '',
        last_name: '',
        email_address: '',
        home_phone: '',
        cell_phone: '',
        home_address: '',
        home_state: '',
        home_zip: '',
        company_name: '',
        work_phone: '',
        work_address: '',
        work_state: '',
        work_zip: '',
        job_title: '',
        password: ''
    };

    $scope.authError = null;

    $scope.signup = function() {
      $scope.success = false;
      $scope.authError = null;
      var api = Restangular.all('account/create');

      // POST /accounts
      api.post($scope.user).then(function(response) {
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