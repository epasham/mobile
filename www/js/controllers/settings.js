'use strict';

// settings controller
app.controller('SettingsFormController', ['$scope', '$http', '$state', 'Restangular', 'storage', function($scope, $http, $state, Restangular, storage) {
    $scope.authError = null;
    $scope.editUser = function() {
      $scope.success = false;
      $scope.authError = null;
      $scope.user_id = storage.get('user_id');
      $scope.editUser.token = storage.get('token');
      $scope.editUser.first_name = $scope.user.first_name;
      $scope.editUser.last_name = $scope.user.last_name;
      $scope.editUser.email_address = $scope.user.email_address;
      $scope.editUser.home_phone = $scope.user.home_phone;
      $scope.editUser.cell_phone = $scope.user.cell_phone;
      $scope.editUser.home_address = $scope.user.home_address;
      $scope.editUser.home_state = $scope.user.home_state;
      $scope.editUser.home_zip = $scope.user.home_zip;
      $scope.editUser.company_name = $scope.user.company_name;
      $scope.editUser.work_phone = $scope.user.work_phone;
      $scope.editUser.work_address = $scope.user.work_address;
      $scope.editUser.work_state = $scope.user.work_state;
      $scope.editUser.work_zip = $scope.user.work_zip;
      $scope.editUser.job_title = $scope.user.job_title;
      // Try to create
      var api = Restangular.all('account/'+$scope.user_id);

      // POST /accounts
      api.post($scope.editUser).then(function(response) {
        $scope.analysis = response;
        if ( response.code == 200 ) {
          $scope.success = true;
          storage.set('user', response);
          $scope.user = response;
          $scope.authError = 'Your profile changes have been saved!';
        } else if ( response.code == 401 ) {
            $state.go('access.signin');
        }
      }, function(x) {
        $scope.authError = $scope.response;
      });
    };

  }])
 ;