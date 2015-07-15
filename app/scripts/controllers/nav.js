'use strict';

/**
 * @ngdoc function
 * @name bugzoollaApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the bugzoollaApp
 */
angular.module('bugzoollaApp')
  .controller('NavCtrl', function ($scope, $location) {
    $scope.isActive = function (path) {
        return path === $location.path();
    };
  });
