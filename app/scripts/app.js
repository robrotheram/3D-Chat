
 var webapp =  angular.module('webapp', ['ngRoute'])


 webapp.config(function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'scripts/views/app.html',
          controller: 'mainController'
        });


    });

 function getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
 }

