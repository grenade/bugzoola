'use strict';

/**
 * @ngdoc function
 * @name bugzoollaApp.controller:DashCtrl
 * @description
 * # DashCtrl
 * Controller of the bugzoollaApp
 */
angular.module('bugzoollaApp')
  .controller('DashCtrl', function ($scope, $cookies, $routeParams, $location, BugFactory) {
    $scope.loading = false;
    if ($routeParams.assignee
      || $routeParams.reporter
      || $routeParams.component
      || $routeParams.whiteboard
      || $routeParams.modified_after
      || $routeParams.created_after) {
      $scope.search = {
        modified_after: (!!$routeParams.modified_after ? new Date($routeParams.modified_after) : undefined),
        created_after: (!!$routeParams.created_after ? new Date($routeParams.created_after) : undefined),
        assignee: $routeParams.assignee,
        reporter: $routeParams.reporter,
        component: $routeParams.component,
        whiteboard: $routeParams.whiteboard
      };
    } else {
      $scope.search = {
        modified_after: (!!$cookies.get('search.modified_after') ? new Date($cookies.get('search.modified_after')) : undefined),
        created_after: (!!$cookies.get('search.created_after') ? new Date($cookies.get('search.created_after')) : undefined),
        assignee: $cookies.get('search.assignee'),
        reporter: $cookies.get('search.reporter'),
        component: $cookies.get('search.component'),
        whiteboard: $cookies.get('search.whiteboard')
      };
    }
    $scope.setSearchCookies = function() {
      for (var key in $scope.search) {
        if ($scope.search.hasOwnProperty(key)) {

          $location.search(key, null)
          if ($scope.search[key]) {
            if ($scope.search[key] instanceof Date) {
              $cookies.put('search.' + key, $scope.search[key].toISOString().substring(0, 10));
            } else {
              $cookies.put('search.' + key, $scope.search[key]);
            }
          } else {
            $cookies.remove('search.' + key);
          }
        }
      }
    }
    $scope.refresh = function(bugSearch) {
      $scope.search.advanced = $scope.search.reporter || $scope.search.component || $scope.search.whiteboard || $scope.search.created_after;
      if(bugSearch.$valid) {
        $scope.setSearchCookies();
        $scope.loading = true;
        BugFactory.query(
          {
            assigned_to: $scope.search.assignee,
            last_change_time: $scope.search.modified_after,
            creation_time: $scope.search.created_after,
            creator: $scope.search.reporter,
            component: $scope.search.component,
            whiteboard: $scope.search.whiteboard
          },
          function(data) {
            var bugs = data.bugs;
            bugs.forEach(function(bug){
              if (bug.whiteboard){
                bug.tags = bug.whiteboard
                  .split(/[\[\],]+/)
                  .filter(function(n){ return n != undefined && n });
              }
              //bug.hidden = !bug.is_open;
              bug.hidden = true;
            });
            $scope.bugs = {
              backlog: bugs.filter(function(bug){ return bug.is_open && bug.status != 'ASSIGNED' }),
              assigned: bugs.filter(function(bug){ return bug.is_open && bug.status == 'ASSIGNED' }),
              resolved: bugs.filter(function(bug){ return !bug.is_open })
            };
            $scope.setVisibility = function(key, hide) {
              $scope.bugs[key].forEach(function(bug){
                bug.hidden = hide;
              });
            };
            $scope.loading = false;
          }
        );
      }
    }
    $scope.$watch('bugSearch', function(bugSearch) {
      if(bugSearch) {
        $scope.refresh(bugSearch);
      }
    });
  });
