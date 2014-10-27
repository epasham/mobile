'use strict';

angular.module('myDayAtCareApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $cookieStore) {
    $scope.errors = {};
    // $scope.getCurrentUser = Auth.getCurrentUser;
    // var currentUser = {};
    // if($cookieStore.get('token')) {
    //   currentUser = User.get();
    // }
    $scope.currentUser =  User.get();
    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
