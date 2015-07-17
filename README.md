这是学习《AngularJS权威指南》并测试1.4版本中的变化的练习项目

run   用于应用的初始化

对表达式进行的任何操作，都会在其所属的作用域内部执行，因此可以在表达式内部调用那些限制在此作用域内的变量，并进行循环、
函数调用、将变量应用到数学表达式中等操作。
angularjs通过$parse这个内部服务来进行表达式的运算，这个服务能够访问当前所处的作用域。这个过程允许我们访问定义在$scope
上的原始javascript数据和函数。
将$parse服务注入到控制器中，然后调用它就可以实现手动解析表达式。
使用$sec.getTrusted()方法进行严格的上下文转义
以HTML的形式使用过滤器时，如果需要传递参数给过滤器，只要在过滤器名字后面加冒号即可。
<p>{{}123.456789 | number:2}</p>
过滤器currency

filter过滤器可以从给定数组中选择一个子集，并将其生成一个新数组返回。这个过滤器通常用来过滤需要进行展示的元素。
例如，在做客户端搜索时，可以从一个数组中立刻过滤出所需的结果。
limitTo
lowercase
number
orderBy


使用模式匹配控制表单输入 <input type="text" ng-pattern="[a-zA-Z]">

1.4版本变化：
  1.$cookieStore将不赞成使用。

  angular.module('myApp', ['ngCookies'])
    .controller('testCtrl',['$scope','$rootScope',function($scope,$rootScope){
      $scope.value = "A ";
    }]);
  不要写成
  .controller('testCtrl',[function($scope,$rootScope){
        $scope.value = "A ";
      });
  这会在压缩的时候出现错误。
