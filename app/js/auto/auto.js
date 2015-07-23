/**
 * Created by CODE-04 on 2015/7/23.
 */
angular.module('myApp', ['ngRoute','myApp.services','ngCookies'])
    .constant('ACCESS_LEVELS', {
        pub: 1,
        user: 2
    })
    .config(function($routeProvider, ACCESS_LEVELS) {
        $routeProvider
            .when('/', {
                controller: 'MainController',
                templateUrl: 'views/main.html',
                access_level: ACCESS_LEVELS.pub
            })
            .when('/account', {
                controller: 'AccountController',
                templateUrl: 'views/account.html',
                access_level: ACCESS_LEVELS.user
            })
            .when('/login',{
                controller:'LoginController',
                templateUrl:'views/login.html',
                access_level:ACCESS_LEVELS.pub
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function($rootScope, $location, Auth) {
        // 给$routeChangeStart设置监听
        $rootScope.$on('$routeChangeStart', function(evt, next, curr) {
            if (!Auth.isAuthorized(next.$$route.access_level)) {
                if (Auth.isLoggedIn()) {
                    // 用户登录了，但没有访问当前视图的权限
                    $location.path('/');
                } else {
                    $location.path('/login');
                }
            }
        });
    }).controller('MainController',function($scope){

    }).controller('LoginController',function(){

    }).controller('AccountController',function(){

    })
;

angular.module('myApp.services', [])
    .factory('Auth', function($cookieStore,ACCESS_LEVELS) {
        var _user = $cookieStore.get('user') || {};
        var setUser = function(user) {
            if (!user.role || user.role < 0) {
                user.role = ACCESS_LEVELS.pub;
            }
            _user = user;
            $cookieStore.put('user', _user);
        };
        return {
            isAuthorized: function(lvl) {
                if(!lvl){
                    return false;
                }
                return _user.role >= lvl;
            },
            setUser: setUser,
            isLoggedIn: function() {
                return _user.id ? true : false;
            },
            getUser: function() {
                return _user;
            },
            getId: function() {
                return _user ? _user._id : null;
            },
            getToken: function() {
                return _user ? _user.token : '';
            },
            logout: function() {
                $cookieStore.remove('user');
                _user = null;
            }
        };
    });

