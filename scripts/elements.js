"use strict";

app = angular.module('echocarmes.elements', []);

app.directive('signPad', function(){
  return {
    restrict: 'E',
    template: "<canvas id='signatureCanvas' width='450' height='250' style='border: 1px solid grey; margin-left: 4px;'></canvas>",
    link: function(scope, element, attrs) {
      scope.canvas = element.find('canvas')[0];
    }
  };
});
