'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngCookies'])
  .factory('EmailParser',['$interpolate',function($interpolate){
    return {
      parse:function(text,context){
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
  .controller('registerCtrl',function($scope,$cookies){
    $scope.value = "lalal";
    $scope.showStatus = function(){
      console.log(signup_form.$valid);
    };
  })
  .directive('oneToTen',function(){
    return {
      require:'?ngModel',
      link:function(scope,ele,attrs,ngModel) {
        if(!ngModel) return;
        ngModel.$parsers.unshift(
          function(viewValue){
            var i = parseInt(viewValue);

            if(i >= 0&& i<10){
              ngModel.$setValidity('oneToTen',true);
              return viewValue;
            }else{
              ngModel.$setValidity('oneToTen',false);
              return undefined;
            }
          }
        );
      }
    }
  });
