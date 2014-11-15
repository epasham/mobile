'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$rootScope', '$scope', '$http', '$state', 'Restangular', '$window', function($rootScope, $scope, $http, $state, Restangular, $window) {
    $rootScope.currentUser = {};
    $scope.user = {};
    $scope.authError = null;
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
        } else {
          $scope.user = {token: response.token, id: response.user_id};
          $window.localStorage.setItem('token', response.token);
          $window.localStorage.setItem('user_id', response.user_id);

          Restangular.all('account').get($scope.user.id, {token: $scope.user.token}).then(function(response) {
            $window.localStorage.setItem('user', response);
            $state.go('app.dashboard');
          });
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };

  }])
;

