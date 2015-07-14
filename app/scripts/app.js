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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/kanban', {
        templateUrl: 'views/kanban.html',
        controller: 'KanbanCtrl',
        controllerAs: 'kanban'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
