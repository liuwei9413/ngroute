alert(1); return;

require(['jquery.min', 'angular.min', 'angular-route.min'], function($, angular, ngroute) {
alert($);

var app = angular.module('myApp', ['ngRoute']);
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

//配置$http请求
// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'; 
//     $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
//     $httpProvider.defaults.transformRequest = function(data) {
//         return $.param(data);    //报错
//     };
// }]);


// var dataList = [
//     { id: 1, title: '标题1111111111', content:'我是内容11111111我是内容11111111', date: new Date() },
//     { id: 2, title: '标题2222222222', content:'我是内容22222222我是内容222222222222', date: new Date() },
//     { id: 3, title: '标题3333333333', content:'我是内容3333333333我是内容333333333', date: new Date() },
//     { id: 4, title: '标题444444444', content:'我是内容4444444444我是内容444444444', date: new Date() },
//     { id: 5, title: '标题55555555555', content:'我是内容5555555我是内容5555555555', date: new Date() },
//     { id: 6, title: '标题66666666', content:'我是内容666666666我是内容6666666666', date: new Date() }
// ];
// var dataList = JSON.parse($('#newsList').val());

//取数据
var dataList;
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


//新闻列表页
app.controller('ListController', ['$scope', '$http', 'getData', function($scope, $http, getData) {
    getData().then(function(data) {
        if ( !dataList ) {
            dataList = data;
        }
        // console.log(dataList);
        $scope.newsList = dataList; 
        //删除新闻
        $scope.delete = function(id) {
            var data = {id: id};
            var url = 'http://i.ngroute.com/main/delete';
            var postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: function(data) {
                    return $.param(data);
                }
            };

            $http.post(url, data, postCfg).then(function(res) {
                if  ( res.data === 'ok' ) {
                    alert('删除成功');
                    for (var i = 0; i < dataList.length; i++) {
                        if ( dataList[i].id === id ) {
                            dataList.splice(i, 1);
                        };
                    };
                    $scope.newsList = dataList;
                }
                
            });
        }

    }, function(data) {
        alert(data);
    });
}]);

//新闻详情
app.controller('DetailController', ['$scope', '$routeParams', '$http', 'getData', function($scope, $routeParams, $http, getData) {
    getData().then(function(data) {
        if ( !dataList ) {
            dataList = data;
        }       
        var id = $routeParams.id;
        for (var i = 0; i < dataList.length; i++) {
            if ( dataList[i].id === id ) {
                $scope.news = dataList[i];
            };
        };
    }, function(data) {
        alert(data);
    });
}]);

//新闻编辑
app.controller('EditController', ['$scope', '$location', '$routeParams', '$http', 'getData', function($scope, $location, $routeParams, $http, getData) {
    getData().then(function(data) {
        if ( !dataList ) {
            dataList = data;
        }       
        var id = $routeParams.id;
        for (var i = 0; i < dataList.length; i++) {
            if ( dataList[i].id === id ) {
                $scope.news = dataList[i];
            };
        };

        $scope.update = function() {      
            var url = 'http://i.ngroute.com/main/update';
            var data = {
                id: id,
                title: $scope.news.title,
                content: $scope.news.content,
                date: +new Date()
            };
            var postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: function(data) {
                    return $.param(data);
                }
            };
            $http.post(url, data, postCfg).then(function(res) {
                for (var i = 0; i < dataList.length; i++) {
                    if ( dataList[i].id === $routeParams.id ) {
                        dataList[i] = data;
                    }
                };
                $location.path('list');
            });
        };

    }, function(data) {
        alert(data);
    });      
}]);

//添加新闻
app.controller('AddController', ['$scope', '$http', '$location', 'getData', function($scope, $http, $location, getData) {  
    getData().then(function(data) {
        if ( !dataList ) {
            dataList = data;
        }       
        $scope.title = '';
        $scope.content = '';
        $scope.add = function() {
            var data = {
                title: $scope.title,
                content: $scope.content,
                date: +new Date()
            };
            var url = 'http://i.ngroute.com/main/add';
            var postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: function(data) {
                    return $.param(data);
                }
            };

            $http.post(url, data, postCfg).then(function(res) {      
                data.id = res.data;    
                dataList.push(data);
                $location.path('list');
            }, function() {
                alert('提交失败，重新提交');
            });

        };  
    }, function(data) {
        alert(data);
    });
    
}]);

});