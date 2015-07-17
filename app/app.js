'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngCookies'])
  .controller('testCtrl',['$scope','$rootScope',function($scope,$rootScope){
    $scope.value = "A ";
  }]);
