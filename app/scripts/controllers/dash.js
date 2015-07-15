'use strict';

/**
 * @ngdoc function
 * @name bugzoollaApp.controller:DashCtrl
 * @description
 * # DashCtrl
 * Controller of the bugzoollaApp
 */
angular.module('bugzoollaApp')
  .controller('DashCtrl', function ($scope, $cookies, BugFactory) {
    var modified_after = $cookies.get('search.modified_after');
    if(!modified_after){
      modified_after = ((function(d){ d.setDate(d.getDate()-14); return d})(new Date)).toISOString().substring(0, 10)
    }
    $scope.search = {
      assignee: $cookies.get('search.assignee'),
      modified_after: new Date(modified_after)
    };
    $scope.refresh = function(bugSearch) {
      if(bugSearch.$valid) {
        $cookies.put('search.assignee', $scope.search.assignee)
        $cookies.put('search.modified_after', $scope.search.modified_after.toISOString().substring(0, 10))
        BugFactory.query(
          {
            assigned_to: $scope.search.assignee,
            last_change_time: $scope.search.modified_after
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
