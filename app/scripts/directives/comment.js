'use strict';

/**
 * @ngdoc directive
 * @name bugzoollaApp.directive:comment
 * @description
 * # comment
 */
angular.module('bugzoollaApp')
  .directive('commentPanel', function () {
    return {
      templateUrl: 'views/comment-panel.html',
      restrict: 'E',
      scope:{
        index: "@",
        comment: "="
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
