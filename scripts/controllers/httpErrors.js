"use strict";


var app = angular.module('echocarmes.controllers.httpErrors', ['ui.router', 'echocarmes.services']);


  app.controller('httpErrors', function($scope, $state, CommonDatas){
    $scope.back = function(){
      CommonDatas.ping();
      $state.go('home');
    }

  });
