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
      templateUrl: 'views/bug.html',
      restrict: 'E',
      scope:{
          bug: "="
      },
      link: function postLink(scope, element, attrs) {
        //element.text('this is the bug directive');
      }
    };
  });
