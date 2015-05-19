"use strict";

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('echocarmes', ['ionic', 'echocarmes.config', 'echocarmes.controllers', 'echocarmes.services', 'echocarmes.elements']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'templates/home.html'
  })
  .state('documents', {
    url: '/documents/:identity',
    templateUrl: 'templates/documents.html',
    params: {'identity': 0, 'reload' : 0, 'document' : 0}
  })
  .state('view', {
    url: '/view/:name/:identity',
    templateUrl: 'templates/view.html',
    params: {'name': 0, 'identity': 0},
    controller: 'View'
  })
  .state('httpError', {
    url: '/httpError/',
    templateUrl: 'templates/httpError.html',
    controller: 'httpErrors'
  })
});


// HTTP Error Interceptor //En gros, à chaque fois qu'une erreur est générée par
// une requête à l'API, ça envoie un broadcast qui redirige vers une page
// d'erreur
app.config(
  function($httpProvider) {
     $httpProvider.interceptors.push(function($q, $rootScope, $log) {
        return {
            response: function (response) {
              return response;
            },
            responseError: function (rejection) {
              $log.debug(rejection);
              $rootScope.$broadcast('httpError');
              return $q.reject(rejection);
            }
        };
    });
  }
);

app.run(
  function($rootScope, $state) {
    $rootScope.$on('httpError', function() {
      $state.go('httpError');
    });
  }
);
