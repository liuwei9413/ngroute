require.config({
    //配置路径
    paths: {
        'angular': 'angular.min',
        'angular-route': 'angular-route.min'
    },
    //这个配置是你在引入依赖的时候的包名
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        }
    },
    deps: ['./angular-bootstrap']
});

require(['app', 'angular-bootstrap', 'controllers/controllers'], function(app) {
    console.log(1);
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'list.html',
                controller: 'ListController'
            })
            .when('/list', {
                templateUrl: 'list.html',
                controller: 'ListController'
            })
            .when('/add', {
                templateUrl: 'add.html',
                controller: 'AddController'
            })
            .when('/detail/:id', {
                templateUrl: 'detail.html',
                controller: 'DetailController'
            })
            .when('/edit/:id', {
                templateUrl: 'edit.html',
                controller: 'EditController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

    //取数据
    app.factory('getData', function($http, $q) {
        return function() {
            var defer = $q.defer();       
            $http.get('http://i.ngroute.com/main', {cache: true}).then(function(res) {
                defer.resolve(res.data);
            }, function() {
                defer.reject('请求失败');
            });
            return defer.promise;   
        }
    });   

});