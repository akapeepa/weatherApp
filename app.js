//Module
var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);

//Routes
weatherApp.config(function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl:'pages/home.html',
    controller:'homeController'
  })
  .when('/forecast',{
    templateUrl:'pages/forecast.html',
    controller:'forecastController'
  })
});

//services
weatherApp.service('cityService',function(){
  this.city = "Jammu and Kashmir, J&K";
})

//controller
weatherApp.controller('homeController',['$scope','cityService',function($scope,cityService){
  $scope.city = cityService.city;
  $scope.$watch('city',function(){
    cityService.city = $scope.city;
  });
}]);
weatherApp.controller('forecastController',['$scope','$resource','cityService',function($scope,$resource,cityService){
  $scope.city = cityService.city;
  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{callback:"JSON_CALLBACK"},{get:{method:"JSONP"}});
  $scope.weatherResult = $scope.weatherAPI.get({q:$scope.city,cnt:3,appid:'8b1fa51c9890086a03a97d35d7bc5b6b'});
  $scope.convertToCelsius = function(degC){
    return Math.round(degC - 273.15);
  };
  $scope.convertToDate = function(dt){
    return new Date (dt * 1000);
  };
}]);
