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
      $scope.bug.depended_on_bugs = [];
      if ($scope.bug.depends_on) {
        $scope.bug.depends_on.forEach(function(depended_on_bug_id) {
          BugFactory.get({ id: depended_on_bug_id }, function(depended_on_bug_data) {
            $scope.bug.depended_on_bugs.push(depended_on_bug_data.bugs[0]);
          });
        });
      }
      $scope.bug.blocked_bugs = [];
      if ($scope.bug.blocks) {
        $scope.bug.blocks.forEach(function(blocked_bug_id) {
          BugFactory.get({ id: blocked_bug_id }, function(blocked_bug_data) {
            $scope.bug.blocked_bugs.push(blocked_bug_data.bugs[0]);
          });
        });
      }
    });
  });
