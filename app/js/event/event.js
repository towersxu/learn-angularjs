/**
 * Created by CODE-04 on 2015/7/24.
 */
angular.module('myApp', ['ngRoute'])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/home',{
            templateUrl:'./partials/home.html',
            controller:'HomeCtrl'
        }).when('/login',{
            templateUrl:'./partials/login.html',
            controller:'LoginCtrl'
        }).otherwise({
            redirectTo:'/home'
        })
    }]).controller('HomeCtrl',['$scope',function($scope){

    }]).controller('LoginCtrl',['$scope',function($scope){
        $scope.$on('$viewContentLoaded',function(){
            console.log("$viewContentLoaded");
            console.log(arguments);
        });
        $scope.$on('$locationChangeSuccess',function(){
            console.log("$locationChangeSuccess");
            console.log(arguments);
        });
        $scope.$on('$locationChangeStart',function(){
            console.log("are you sure leave this page?");
            console.log(arguments);
            //arguments[0].preventDefault();
        })
    }]);