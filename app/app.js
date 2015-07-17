'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])
  .factory('EmailParser',['$interpolate',function($interpolate){
    return {
      parse:function(text,context){
        console.log(text);
        console.log(context);
        var template = $interpolate(text);
        return template(context);
      }
    }
  }])
  .factory("userinfo", function () {
    var user = {
      name: "xt",
      getName: function () {
        return this.name
      }
    };
    return user;
  })
  .controller("ctrl", ['$scope', 'userinfo', '$parse', function ($scope, userinfo, $parse) {
    console.log(userinfo.name);
    console.log(userinfo.getName);
    var name = userinfo.getName();
    console.log(name);
    $scope.$watch('expr', function (newVal, oldVal, scope) {
      if(newVal !== oldVal) {
        var parseFun = $parse(newVal);
        $scope.parseValue = parseFun(scope);
      }
    });
  }])
  .controller('interCtrl',['$scope','EmailParser',function($scope,EmailParser){
    $scope.$watch('emailBody',function(body){
      if(body){
        $scope.previewText = EmailParser.parse(body,{to:$scope.to});
      }
    });
  }])
  .controller('registerCtrl',function($scope){

  });
