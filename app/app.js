'use strict';

angular.module('myApp',[])
  .provider('githubService', {
    githubUr: 'https://github.com',
    setGithubUrl:function(url){
      if(url){
        this.githubUr = url;
      }
    },
    method:'JSONP',
    $get:function($http){
      var self = this;
      return $http({method:self.method,url:self.githubUr+'/towersxu'});
    }
  })
  .config(function(githubServiceProvider){
    githubServiceProvider.setGithubUrl('https://git@github.com')
  })
  .controller('gitCtrl',function(githubService){
    //console.log(githubService);
  });

