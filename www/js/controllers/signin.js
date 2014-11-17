'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$rootScope', '$scope', '$http', '$state', 'Restangular', 'storage', function($rootScope, $scope, $http, $state, Restangular, storage) {
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
          storage.set('token', response.token);
          storage.set('user_id', response.user_id);

          Restangular.all('account').get($scope.user.id, {token: $scope.user.token}).then(function(response) {
            storage.set('user', response);
            $state.go('app.dashboard');
          });
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };

  }])
;

