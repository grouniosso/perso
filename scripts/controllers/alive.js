"use strict";

var app = angular.module('echocarmes.controllers.alive', ['ngIdle','ui.router']);

app.controller('Alive', function($state, $scope, Idle, Keepalive){
  $scope.startWatch = function(){
    Idle.watch();
    $scope.started = true;
  }
  $scope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
      if(toState.name !== 'home')
        $scope.startWatch();
  });
  $scope.$on('IdleStart', function() {
      $state.go('home');
  });

})
.config(function(IdleProvider, KeepaliveProvider, SESSION_TIMEOUT) {
  IdleProvider.idle(SESSION_TIMEOUT*60);
  IdleProvider.timeout(0);
  KeepaliveProvider.interval(10);
});
