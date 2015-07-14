'use strict';

/**
 * @ngdoc directive
 * @name bugzoollaApp.directive:bug
 * @description
 * # bug
 */
angular.module('bugzoollaApp')
  .directive('bugPanel', function () {
    return {
      templateUrl: 'views/bug-panel.html',
      restrict: 'E',
      scope:{
        verbose: "@",
        bug: "="
      },
      link: function postLink(scope, element, attrs) {
        var verbose = attrs.verbose;
        if((verbose === null) || (verbose === undefined) || (verbose === '')) {
          verbose = false;
        }
      }
    };
  });
