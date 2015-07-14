'use strict';

/**
 * @ngdoc function
 * @name bugzoollaApp.controller:DashCtrl
 * @description
 * # DashCtrl
 * Controller of the bugzoollaApp
 */
angular.module('bugzoollaApp')
  .controller('DashCtrl', function ($scope, BugFactory) {
    BugFactory.query(
      {
        assigned_to: 'rthijssen@mozilla.com',
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
      });
  });
