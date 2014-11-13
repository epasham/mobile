'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$rootScope', '$scope', '$http', '$state', 'Restangular', function($rootScope, $scope, $http, $state, Restangular) {
    $rootScope.currentUser = {};
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
            $scope.user = {token: response.token, id: response.user_id};
            $rootScope.token = response.token;
            $rootScope.user_id = response.user_id;
          //remove when api works
          // $scope.user = {
          //     first_name: "John",
          //     last_name: "Doe",
          //     email_address: "example@example.com",
          //     home_phone: "555-555-5555",
          //     cell_phone: "555-555-5556",
          //     home_address: "2004 Nowhere Lane",
          //     home_state: "MD",
          //     home_zip: 21113,
          //     work_phone: "555-555-5556",
          //     work_address: "2004 Nowhere Lane",
          //     work_state: "MD",
          //     work_zip: 21113,
          //     job_title: "Some Title",
          //     type: "Parent"
          // };
          // $state.go('app.dashboard');
          //remove
           Restangular.all('account').get($scope.user.id, {token: $scope.user.token}).then(function(response) {
            $scope.user = response;
            $rootScope.currentUser = response;
            $state.go('app.dashboard');
          });
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };

  }])
;

