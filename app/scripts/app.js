'use strict';

/**
 * @ngdoc overview
 * @name bugzoollaApp
 * @description
 * # bugzoollaApp
 *
 * Main module of the application.
 */
angular
  .module('bugzoollaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dash.html',
        controller: 'DashCtrl',
        controllerAs: 'dash'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/bug/:id', {
        templateUrl: 'views/bug.html',
        controller: 'BugCtrl',
        controllerAs: 'bug'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
