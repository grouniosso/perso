"use strict";

var app = angular.module('echocarmes.controllers.header', ['ui.router', 'echocarmes.services']);

app.controller('Header', function($scope, $state, $stateParams, CommonDatas){
  $scope.identity = CommonDatas.getLocalMedecin();

  $scope.logout = function(){
    $state.go('home');
  };

});
