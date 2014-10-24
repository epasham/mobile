'use strict';

angular.module('myDayAtCareApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          firstName: $scope.user.name,
          lastName: $scope.user.name,
          address: $scope.user.address,
          homePhone: $scope.user.homePhone,
          workPhone: $scope.user.workPhone,
          cellPhone: $scope.user.cellPhone,
          workAddress: $scope.user.workAddress,
          jobTitle: $scope.user.jobTitle,
          income: $scope.user.income,
          dob: $scope.user.dob,
          relationship: $scope.user.relationship,
          classLevel: $scope.user.classLevel,
          role: $scope.user.role,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
