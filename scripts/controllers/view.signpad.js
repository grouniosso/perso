"use strict";


var app = angular.module('echocarmes.controllers.view.signpad', ['ui.router', 'ngSignaturePad', 'echocarmes.services']);



  app.controller('Signpad',
    function($ionicModal, $scope, $state, $stateParams, DocumentsDatas, $element){

    var template = "templates/view.signpad.html";


    $ionicModal.fromTemplateUrl(template, {
        scope: $scope
    }).then(function(modal){
      $scope.modal = modal;
    });

    $scope.$on('$destroy', function(){
      $scope.modal.remove();
    });

    $scope.openSign = function($event){
      $scope.modal.show($event);
    };
    $scope.$on('signature', function(event, signature){
      $scope.signaturePad = signature;
    });
    $scope.clearCanvas = function(){
      $scope.signaturePad.clear();
    }

    $scope.saveCanvas = function() {
        var sigImg = $scope.signaturePad.toDataURL();
        $scope.signature = sigImg;
        var handleSuccess = function(data){
          $scope.modal.hide();
          $scope.signaturePad.clear();
          $state.go('documents', {'document' : data, 'identity': $stateParams.identity});
        };
        var handleError = function(error){
          $scope.modal.hide();
        }
        DocumentsDatas.signDocument($stateParams.name, $scope.signature).success(handleSuccess).error(handleError);
    }
  });
