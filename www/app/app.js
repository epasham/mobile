'use strict';

angular.module('myDayAtCareApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngCordovaMocks',
  'ngRoute',
  'restangular'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  });