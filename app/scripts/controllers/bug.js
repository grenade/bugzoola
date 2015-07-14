'use strict';

/**
 * @ngdoc function
 * @name bugzoollaApp.controller:BugCtrl
 * @description
 * # BugCtrl
 * Controller of the bugzoollaApp
 */
angular.module('bugzoollaApp')
  .controller('BugCtrl', function ($scope, $routeParams, BugFactory, CommentFactory) {
    BugFactory.get({ id: $routeParams.id }, function(data) {
      $scope.bug = data.bugs[0];
      CommentFactory.get({ bug_id: $routeParams.id }, function(data) {
        $scope.bug.comments = data.bugs[$routeParams.id].comments;
      });
    });
  });
