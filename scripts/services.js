"use strict";


var app = angular.module('echocarmes.services', []);

app.factory('API', function(ENV, DEV, PROD){
  if (ENV === "DEV")
    return DEV;
  else
    return PROD;
});



app.factory('CommonDatas', function($http, API) {
  return {
    ping: function(){
      $http.get(API.url+'ping');
    },
    getMedecins: function(){
        return $http.get(API.url+'personnel');
      },
    setLocalMedecin: function(identity, nom){
        window.localStorage.setItem('identity', identity);
        window.localStorage.setItem('nom', nom);
    },
    getLocalMedecin: function(){
      return {
        identity: window.localStorage.getItem('identity'),
        nom: window.localStorage.getItem('nom')
      }
    }
  }
});



app.factory('DocumentsDatas', function($http, API){
  return {
    getDocuments: function(id_medecin){
      return $http.get(API.url+'documents/'+id_medecin);
    },
    getDocument: function(id){
      return $http.get(API.url+'documents/viewid'+id);
    },
    signDocument: function(id, sign){
      return $http({
        url: API.url+'documents',
        method: 'POST',
        data: {signature: sign, id: id}
      });
    }
  };
});
