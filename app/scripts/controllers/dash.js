'use strict';

/**
 * @ngdoc function
 * @name bugzoollaApp.controller:DashCtrl
 * @description
 * # DashCtrl
 * Controller of the bugzoollaApp
 */
angular.module('bugzoollaApp')
  .controller('DashCtrl', function ($scope, $cookies, $routeParams, $location, BugFactory, CommentFactory) {
    $scope.loading_status = 'thinking...';
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
        $scope.count = 0;
        $scope.loading_status = 'talking to bugzilla...';
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
            $scope.bugs = {
              backlog: [],
              has_comments: [],
              has_patches: [],
              resolved: []
            };
            $scope.count = data.bugs.length;
            $scope.processed = 0;
            $scope.loading_status = 'sorting bugs...';
            data.bugs.forEach(function(bug){
              if (bug.whiteboard){
                bug.tags = bug.whiteboard
                  .split(/[\[\],]+/)
                  .filter(function(n){ return n != undefined && n });
              }
              bug.hidden = true;
              if (!bug.is_open) {
                $scope.processed ++;
                $scope.bugs.resolved.push(bug);
              } else {
                if (!bug.is_open) {
                  $scope.processed ++;
                  $scope.bugs.resolved.push(bug);
                } else {
                  CommentFactory.get({ bug_id: bug.id }, function(bug_data) {
                    if (bug_data.bugs[bug.id].comments.filter(function(c){ return c.attachment_id }).length) {
                      $scope.processed ++;
                      $scope.bugs.has_patches.push(bug);
                    } else {
                      if (bug_data.bugs[bug.id].comments.length > 1) {
                        $scope.processed ++;
                        $scope.bugs.has_comments.push(bug);
                      } else {
                        $scope.processed ++;
                        $scope.bugs.backlog.push(bug);
                      }
                    }
                  });
                }
              }
            });
            $scope.setVisibility = function(key, hide) {
              $scope.bugs[key].forEach(function(bug){
                bug.hidden = hide;
              });
            };
          }
        );
      }
    }
    $scope.$watch('processed', function(processed) {
      if(processed === $scope.count) {
        $scope.loading_status = false;
      }
    });
    $scope.$watch('bugSearch', function(bugSearch) {
      if(bugSearch) {
        $scope.refresh(bugSearch);
      }
    });
  });
