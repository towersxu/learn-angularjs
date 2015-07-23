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


ng-disabled 可以绑定到input textarea select button上
  <input type="checkbox" ng-checked="someProperty" ng-init="someProperty = true" ng-model="someProperty">

使用模式匹配控制表单输入 <input type="text" ng-pattern="[a-zA-Z]">

ng-switch
          <div ng-switch on="person.name">
              <p ng-switch-default>And the winner is {{person.name}}</p>
              <h1 ng-switch-when="Ari">{{person.name}}</h1>
          </div>
          可以在propertyName发生变化时渲染不同指令到视图。当person.name是Ari时，文本域下面的div会显示出来。

ng-if同ng-show和ng-hide指令最本质的区别时，它不是通过CSS显示或隐藏DOM节点，而是真正生成或移除节点。

ng-init 设置作用域的初始状态，最好不用，一般都在controller中设置。

{{}} 在内部$scope和视图之间创建绑定。 注意，在屏幕可视的区域内使用会导致页面加载时未渲染的元素发生闪烁，用ng-bind可以避免这个问题。
      <div ng-init="greeting='Hello'">
          <p ng-bind="greeting"></p>
      </div>

ng-repeat
  $index:遍历的进度 （0 ... length-1）
  $first:当元素时遍历的第一个时值为true
  $middle:
  $last:
  $even:
  $odd:

ng-model 用来将input、select、textarea或自定义表单控件同包含它们的作用域中的属性进行绑定。它可以提供并处理表单验证功能，
在元素上设置相关的CSS类，并负责在父表单中注册控件。它将当前作用域中运算表达式的值同给定的元素进行绑定。如果属性不存在，它会
隐式创建并将其添加到当前作用域中。我们应该始终用ngModel来绑定$scope上一个数据模型的属性，而不是$scope上的属性。这可以避免
在作用域或后代作用域中发生属性覆盖。

ng-attr-(suffix) 有时浏览器会对属性进行苛刻的限制。SVG就是一个例子：
  <svg>
    <circle cx="{{ cx }}"></circle>
  </svg>
  运行上面的代码会抛出一个错误，指出我们有一个非法属性。使用ng-attr-cx来解决这个问题。
  <svg>
    <circle ng-attr-cx = "{{cx}}"></circle>
  </svg>

自定义指令最好有前缀。但不要使用ng
指令参数
  1）termial boolean 如果元素上某个指令设置了terminal参数并具有较高的优先级，就不要再用其他低优先级的指令对其进行修饰，因为不会
  被调用。但是具有相同优先级的指令还是会被继续调用。例如ngView和ngIf,ngIf的优先级略高于ngView,如果ngIf的表达式值为false,由于
  ngView的优先级较低就不会被执行。

  2）templateUrl 模板的URL将通过AngularJS内置的安全层，特别是$getTrustedResourceUrl，这样可以保护模板不会被不信任的源加载。
  模板加载是通过Ajax异步加载的，意味着编译和链接要暂停，等待模板加载完成。加载大量的模板将严重拖慢一个客户端应用的速度。为了避免
  延迟，可以在部署应用之前对HTML模板进行缓存。模板加载后，AngularJS会将它默认缓存到$templateCache服务中。在实际生产中，可以提前
  将模板缓存到一个定义模板的js文件中，这样就不需要通过XHR来加载模板了。

  3）scope参数是可选的，默认false，设置为true时，会从父作用域继承并创建一个新的作用域。

  4）隔离作用域，主要使用在创建可复用的组件，组件可以在未知上下文中使用，并且可以避免污染所处的外部作用域或不经意地污染内部作用域。
  创建具有隔离作用域的指令需要将scope属性设置为一个空对象{}。如果这样做了，指令就无法访问外部作用域了。

  5)controller参数可以是一个字符串或一个函数。
    controller:function($scope,$element,$attrs,$transclude){
      $scope：与指令元素相关联的当前作用域。
      $element:当前指令对应的元素。
      $attrs:由当前元素的属性组成的对象。
      $transclude:嵌入链接函数与对应的嵌入作用域进行预绑定。transclude链接函数是实际被执行用来克隆元素和操作DOM的函数。
      在控制器内部操作DOM是和AngularJS风格相悖的做法，但通过链接函数就可以实现这个需求。仅在compile参数中使用transcludeFn是
      推荐的做法。
      例如，想要通过指令来添加一个超链接标签。可以在指令控制器内的$transclude函数中实现，如下：
      angular.module('myApp', ['ngCookies'])
        .directive('link',function(){
          return {
            restrict:'EA',
            transclude:true,
            controller:function($scope,$element,$transclude,$log){
              $transclude(function(clone){
                console.log(clone);
                var a =angular.element('<a>');
                a.attr('href',clone.text());
                a.text(clone.text());
                $log.info("Created new a tag in link directive");
                $element.append(a);
              });
            }
          }
        });
      link函数可以将指令互相隔离开来，而controller则定义可复用的行为。
      如果我们希望将当前指令的API暴露给其他指令使用，可以使用controller参数，否则可以使用link来构造当前指令元素的功能性。如果我们
      使用了scope.$watch()或者想要与DOM元素做实时的交互，使用link会是更好的选择。因为在使用了嵌入，控制器中的作用域所反映的作用域
      可能与我们所期望的不一样，这种情况下，$scope对象无法保证可以被正常更新。

    6)require 参数可以是字符串或数组，字符串代表另一个指令的名字。require会将控制器注入到其值所指定的指令中，并作为当前指令的链接
    函数的第四个参数。
      前缀：
      ?:如果在当前指令中没有找到所需找到所需要的控制器，会将null作为传给link函数的第四个参数
      ^:指令会在上游指令链中查找require参数所指定的控制器。
      ？^:我们可选择地加载需要的指令并在父指令链中进行查找。
      如果不使用^前缀，指令只会在自身的元素上查找控制器。
      require：'ngModel'  //指令定义只会查找定义在指令当前作用域中的ng-model=""

    7）compile 通常情况下，如果设置了compile函数，说明我们希望在指令和实时数据被放在DOM之前进行DOM操作，在这个函数中进行诸如添加和
    删除节点等DOM是安全的。
    注意：compile和link选项是互斥的，同时设置会把compile所返回的函数当作链接函数，而link选项本身则会被忽略。
    编译函数负责对模板DOM进行转换。
    链接函数负责将作用域和DOM进行链接。在作用域同DOM链接之前可以手动操作DOM。在实践中，编写自定义指令时这种操作是非常罕见的，但有几个
    内置i指令提供了这样的功能。

    8）link 链接 用link函数创建可以操作DOM的指令。链接函数是可选的，如果定义了编译函数，它回返回链接函数，因此当两个函数都定义了时，
    编译函数会重载链接函数。如果指令很简单，并且不需要额外设置，可以从工厂函数返回一个函数来代替对象。如果这样做了，这个函数就是链接
    函数。
    链接函数的作用：它会在模板编译并同作用域进行链接后被调用，因此它负责设置事件监听器，监听数据变化和实时的操作DOM。
    link函数对绑定了实时数据的DOM具有控制能力，因此需要考虑性能问题。这个时候需要考虑是使用编译函数还是链接函数实现功能。
    link:function(scope,element,attrs){}
    如果指令定义中有require选项，link函数会有第四个参数，代表控制器或者所依赖的指令的控制器。
    如果require选项提供了一个指令数组，第四个参数会是一个由每个指令所对应的控制器组成的数组。
    link 参数：
      scope 指令用来在其内部注册监听器的作用域。
      element 使用此指令的元素。在postLink函数中我们应该只操作此元素的子元素，因为子元素已经被链接过了。
      attrs 实例属性，是一个由定义在元素上的属性组成的标准化列表，可以在所有指令的链接函数间共享。会以对象形式进行传递。
      controller 该参数指向require选项定义的控制器。如果没有设置require选项，那么controller为undefined，控制器在所有的指令间
      共享，因此指令可以将控制器当作通信通道(公共API)。如果设置了多个require，那么这个参数会是一个由控制器实例组成的数组，而不只是
      一个单独的控制器。

    9）ngModel 用法特殊的指令，它提供更底层的API来处理控制器内的数据。
    在指令中使用ngModel时能够访问一个特殊的API，这个API用来处理数据绑定、验证、CSS更新等不实际操作DOM的事情。
    ngModel控制器会随着ngModel被一直注入到指令中，使用方法如下：
      angular.module('myApp', ['ngCookies'])
        .directive('ensureUnique',function(){
          return {
            require:'ngModel',
            link:function(scope,ele,attrs,ngModel){
              if(!ngModel) return;
              scope.watch(attrs.ngModel,function(){

              })
            }
          }
        });
      注意1：这种指令只能用于标签含有ng-model属性的标签
      注意2：这个指令没有隔离作用域。如果给这个指令设置隔离作用域，将导致内部ngModel无法更新外部ngModel的对应值：AngularJS会在本地
            作用域以外查询值。

模块加载
  对模块进行配置时，需要格外注意只有少数几种类型的对象可以被注入到config()函数中：提供者和常量。如果将一个服务注入进去，会在真正对
  其进行配置之前就意外地把服务实例化了。所以，我们只能用provider()语法构建的服务。
  config()代码块可以对服务进行自定义配置，例如设置API秘钥或自定义URL等。

ngView指令遵守以下规则。
  每次触发$routeChangeSuccess事件，视图都会更新。
  如果某个模板同当前的路由相关联：
    创建一个新的作用域；
    移除上一个视图，同时上一个作用域也会被清除；
    将新的作用域同当前模板关联在一起；
    如果路由中有相关的定义，那么就把对应的控制器同当前作用域关联起来；
    触发$viewContentLoaded事件；
    如果提供了onload属性，调用该属性所指定的函数。

路由
  reloadOnSearch 默认true，当$location.search()发生变化时会重新加载路由。如果设置为false，那么当URL中的查询串部分发生变化时
  就不会重新加载路由。这个小窍门对路由嵌套和原地分页等需求非常有用。

$location
  path() 修改当前路径，并跳转到应用中的另一个URL，该方法直接和HTML5的历史API进行交互，所以用户可以通过点击后退按钮退回到上一个
  页面。
  replace() 如果你希望跳转后用户不能点击后退按钮(对于登陆之后的跳转这种)。

angularjs路由模式分为标签模式和HTML5模式，后端服务器也需要支持URL重新，服务器需要确保所有的请求都返回index.html,以支持
HTML5模式。这样才能确保由angularJS应用来处理路由。

为了在应用的过程中给爬虫提供支持，我们需要在头部添加meta标签。这个元标记会让爬虫请求一个带有空的转义片段参数的链接，
服务器会根据请求返回对应的HTML代码片段。
<meta name="fragment" content="!" />

如果我们想要在作用域的生命周期外使用$location服务，必须使用$apply函数将变化抛到应用外部。因为$location服务是基于$digest
来驱动浏览器的地址变化，以使路由事件正常工作的。

推断式注入声明：AngularJS会假定参数名称就是依赖的名称。
显示注入声明：通过$inject来实现显示注入声明。aController.$inject = ['$scope','greeter'];
行内注入声明：.controller("ctrlName",["$scope",function(){}])

$injector API
annotate() 返回一个由服务名称组成的数组，这些服务会在实例化时被注入到目标函数中。
get() 参数name 根据名称返回服务的实例。
has() 参数name 判断注册列表中是否有对应的服务。
instantiate() 参数构造函数Type locals 返回Type的新实例
invoke() 调用方法，并从$injector中添加方法参数。

出于内存占用和性能的考虑，控制器只会在需要时被实例化，并且不再需要就会被销毁。这意味着每次切换路由或重新加载视图时,
当前的控制器会被AngularJS清除掉。

服务提供了一种能在应用整个生命周期内保持数据的方法，它能够在控制器之间进行通信，并且能保证数据的一致性。
服务是一个单例对象，在每个应用中只会被实例化一次（$inejctor实例化），并且是延迟加载的。服务提供了把与特
定功能相关联的方法集中在一起的接口。

内置服务$timeout。
app.controller('ServiceController', function($scope, $timeout, githubService) {
  // 和上面的示例一样, 添加了$timeout服务
  var timeout;
  $scope.$watch('username', function(newUserName) {
    if (newUserName) {
      // 如果在进度中有一个超时(timeout)
      if (timeout) $timeout.cancel(timeout);
      timeout = $timeout(function() {
      githubService.events(newUserName)
      .success(function(data, status) {
      $scope.events = data.data;
      });
      }, 350);
    }
  });
});

所有的服务都是由$provide服务创建的，$provide服务负责在运行时初始化这些提供者。
提供者是一个具有$get()方法的对象，$injector通过调用$get方法创建服务实例。$provide提供了数个不同的API
用于创建服务，每个方法都有各自的特殊用途。
所有创建服务的方法都构建在provider方法之上。provider()方法负责在$providerCache中注册服务。
factory()函数是provider使用$get()注册服务的略简形式。

如果希望在config()函数中可以对服务进行配置。必须用provider()来定义服务。
用这个方法创建服务，必须返回一个定义有$get()函数的对象，否则会导致错误。
.provider()是非常强大的，可以让我们在不同的应用中共享服务。
如果服务的$get方法返回的是一个常量，那就没要必要定义一个包含复杂功能的完整服务，
可以通过value()函数方便地注册服务。

可以将一个已经存在的变量值注册为服务，并将其注入到应用的其他部分当中。例如，假设
我们需要给后端服务一个apiKey，可以用constant()将其当作常量保存下来。这个常量不能被装饰器拦截。
value()方法和constant()方法之间最主要的区别是， 常量可以注入到配置函数中，而值不行。
通常情况下，可以通过value()来注册服务对象或函数，用constant()来配置数据。

decorator() $provide服务提供了在服务实例创建时对其进行拦截的功能，可以对服务进行扩展，或者用
另外的内容完全代替它。AngularJS中很多功能的测试就是借助$provide.decorator()建立的。
对服务进行装饰的场景有很多，比如对服务进行扩展，将外部数据缓存进localStorage的功能，
或者对服务进行封装以便在开发中进行调试和跟踪等。

我们可以调用HttpPromise对象上的then()、 success()和error()方法。 then()方法与其
他两种方法的主要区别是，它会接收到完整的响应对象，而success()和error()则会对响应对
象进行析构。

$http
 params（字符串map或对象）
这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是
字符串，会被JSON序列化。
// 参数会转化为?name=ari的形式
$http({
params: {'name': 'ari'}
})

data（字符串或对象）
这个对象中包含了将会被当作消息体发送给服务器的数据。通常在发送POST请求时使用。
从AngularJS 1.3开始，它还可以在POST请求里发送二进制数据。要发送一个blob对象，你
可以简单地通过使用data参数来传递它。例如：
var blob = new Blob(['Hello World'], {type: 'text/plain'});
$http({
method: 'POST',
url: '/',
data: blob
});

每次发送请求时都传入一个自定义缓存是很麻烦的事情（即使是在服务中）。可以通过应用
的.config()函数给所有$http请求设置一个默认的缓存：
angular.module('myApp', [])
.config(function($httpProvider, $cacheFactory) {
$httpProvider.defaults.cache = $cacheFactory('lru', {
capacity: 20
});
});
现在，所有的请求都会使用我们自定义的LRU缓存了。

AngularJS通过拦截器提供了一个从全局层面对响应进行处理的途径。
拦截器是$http服务的基础中间件，用来向应用的业务流程中注入新的逻辑。
拦截器的核心是服务工厂，通过向$httpProvider.interceptors数组中添加服务工厂，在$httpProvider中进行注册。
```javascript
//调用模块的.factory()方法来创建拦截器，可以在服务中添加一种或多种拦截器：
angular.module('myApp', [])
    .factory('myInterceptor', function($q) {
      var interceptor = {
        'request': function(config) {
        // 成功的请求方法
          return config; // 或者 $q.when(config);
        },
        'response': function(response) {
        // 响应成功
          return response; // 或者 $q.when(config);
        },
        'requestError': function(rejection) {
          // 请求发生了错误，如果能从错误中恢复，可以返回一个新的请求或promise
          return response; // 或新的promise
          // 或者，可以通过返回一个rejection来阻止下一步
          // return $q.reject(rejection);
        },
        'responseError': function(rejection) {
          // 请求发生了错误，如果能从错误中恢复，可以返回一个新的响应或promise
          return rejection; // 或新的promise
          // 或者，可以通过返回一个rejection来阻止下一步
          // return $q.reject(rejection);
        }
      };
      return interceptor;
    });
//我们需要使用$httpProvider在.config()函数中注册拦截器：
angular.module('myApp', [])
    .config(function($httpProvider) {
      $httpProvider.interceptors.push('myInterceptor');
    });
```
1.4版本变化：
  1.$cookieStore将不赞成使用。

  angular.module('myApp', ['ngCookies'])
    .controller('testCtrl',['$scope','$rootScope',function($scope,$rootScope){
      $scope.value = "A ";
    }]);
  不要写成
  .controller('testCtrl',function($scope,$rootScope){
        $scope.value = "A ";
      });
  这会在压缩的时候出现错误。
