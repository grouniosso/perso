"use strict";


var app = angular.module('echocarmes.controllers.documents', ['ui.router','echocarmes.services']);


  app.controller('Documents', function($scope, $state, DocumentsDatas, $stateParams, $ionicPopup, $timeout){
    var handleSuccess = function(data){
      $scope.documents = data;

      $scope.documents.range = function() {
        var range = [];
        for( var i = 0; i < $scope.documents.length; i = i + 3 )
          range.push(i);
        return range;
      }
    };

    $scope.doRefresh = function(){
      DocumentsDatas.getDocuments($stateParams.identity)
      .success(handleSuccess)
      .finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
    }



    $scope.$on('$stateChangeSuccess', function(){
      $scope.doRefresh();
      if(typeof $stateParams.document !== "undefined"
         && $stateParams.document !== 0){
        // Popup
        $scope.showPopup = function(document) {
          if(typeof document === "undefined")
            var document = {nom: "undefined"};

          var signCallback = $ionicPopup.alert({
            template: 'Le document a bien été signé.',
            title: document.nom
          });
          signCallback.then(function() {
            signCallback.close();
          });
          $timeout(function(){
            signCallback.close();
          }, 5000)
        };

        $scope.showPopup($stateParams.document);
      }
    });




  });
