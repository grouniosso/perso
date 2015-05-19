"use strict";


var app = angular.module('echocarmes.controllers.view', ['ui.router', 'ngPDFViewer', 'echocarmes.controllers.view.signpad', 'echocarmes.services']);



  app.controller('View',
  ['$ionicPopup', '$scope','$state','$stateParams', 'PDFViewerService', 'DocumentsDatas', '$sce', '$ionicLoading', '$rootScope',
    function($ionicPopup, $scope, $state, $stateParams, pdf, DocumentsDatas, $sce, $ionicLoading, $rootScope){

      $ionicLoading.show({
        template: '<div class="icon ion-loading-b"></div>'+'<br />'+'<span>Chargement...</span>',
        noBackdrop: true,
        hideOnStateChange: true
      });

      var handleSuccess = function(data){
        console.log(data);
        $scope.document = data;
        $scope.pdfUrl = $scope.document.url;
        pdf.disableRange = true;
        $scope.viewer = pdf.Instance("viewer");
      };


      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      };

      $scope.loadProgress = function(loaded, total, state) {
        if(total <= 0)
          $ionicLoading.hide();
    	};

      $scope.doRefresh = function(){
        DocumentsDatas.getDocument($stateParams.name).success(handleSuccess)
        .finally(function() {
         $scope.$broadcast('scroll.refreshComplete');
       });
     };

      $scope.$on('$stateChangeSuccess', function(){
        $scope.doRefresh();
      });

  }]);
