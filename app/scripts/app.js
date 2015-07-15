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
      .when('/search', {
        templateUrl: 'views/dash.html',
        controller: 'DashCtrl',
        controllerAs: 'dash'
      })
      .when('/bug/:id', {
        templateUrl: 'views/bug.html',
        controller: 'BugCtrl',
        controllerAs: 'bug'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
