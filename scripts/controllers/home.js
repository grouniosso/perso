"use strict";


var app = angular.module('echocarmes.controllers.home', ['ui.router', 'echocarmes.services']);


app.controller('Home', function($scope, $state, CommonDatas, $rootScope){
  var handleSuccess = function(data){
    $scope.medecins = data;
  }

  $scope.doRefresh = function(){
    CommonDatas.getMedecins().success(handleSuccess).error();
    $scope.identity = CommonDatas.getLocalMedecin().identity;
    if($scope.identity > 0)
      $scope.select = $scope.identity;
    else
      $scope.select = 0;
  }

  $scope.connect = function(){
    CommonDatas.setLocalMedecin($scope.select, $scope.medecins[$scope.select].nom);
    $state.go('documents', {'identity': $scope.select});
  };

  $scope.$on('$stateChangeSuccess', function(){
    $scope.doRefresh();
  });
});
