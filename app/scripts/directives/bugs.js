'use strict';

/**
 * @ngdoc directive
 * @name bugzoollaApp.directive:bugs
 * @description
 * # bugs
 */
angular.module('bugzoollaApp')
  .directive('bugsPanel', function () {
    return {
      templateUrl: 'views/bugs-panel.html',
      restrict: 'E',
      scope:{
          title: "@",
          bugs: "="
      },
      link: function postLink(scope, element, attrs) {
        //element.text('this is the bugs directive');
      }
    };
  });
