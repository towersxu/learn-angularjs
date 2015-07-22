'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngCookies'])
  .run(function($rootScope){
    alert(1);
    $rootScope.url = 'http://www.baidu.com';
  })
  .directive('ensureUnique',function(){
    return {
      require:'ngModel',
      link:function(scope,ele,attrs,ngModel){
        if(!ngModel) return;
        scope.watch(attrs.ngModel,function(){

        })
      }
    }
  }).controller('urlCtrl',['$scope',function($scope){
    console.log(ConnectionProvider);
  }]);