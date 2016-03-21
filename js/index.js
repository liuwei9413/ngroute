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

// var newsList = [
//     { id: 1, title: '标题1111111111', content:'我是内容11111111我是内容11111111', date: new Date() },
//     { id: 2, title: '标题2222222222', content:'我是内容22222222我是内容222222222222', date: new Date() },
//     { id: 3, title: '标题3333333333', content:'我是内容3333333333我是内容333333333', date: new Date() },
//     { id: 4, title: '标题444444444', content:'我是内容4444444444我是内容444444444', date: new Date() },
//     { id: 5, title: '标题55555555555', content:'我是内容5555555我是内容5555555555', date: new Date() },
//     { id: 6, title: '标题66666666', content:'我是内容666666666我是内容6666666666', date: new Date() }
// ];
// var newsList = JSON.parse($('#newsList').val());

var dataList;

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

//新闻列表页
app.controller('ListController', ['$scope', 'getData', function($scope, getData) {
    getData().then(function(data) {
        if ( !dataList ) {
            dataList = data;
        }
        $scope.newsList = dataList; 
    }, function(data) {
        alert(data);
    });
}]);

//新闻详情页
app.controller('DetailController', ['$scope', '$routeParams', 'getData', function($scope, $routeParams, getData) {
    getData().then(function(data) {
        if ( !dataList ) {
            dataList = data;
        }
        $scope.news = dataList[$routeParams.id - 1];
    }, function(data) {
        alert(data);
    })    
}]);

//新闻编辑页
app.controller('EditController', ['$scope', '$location', '$routeParams', 'getData', function($scope, $location, $routeParams, getData) {
    getData().then(function(data) {
        if ( !dataList ) {
            dataList = data;
        }
        $scope.news = dataList[$routeParams.id - 1];
        $scope.update = function() {
            $scope.news.date = new Date();
            data[$routeParams.id - 1] = $scope.news;
            $location.path('list');
        };
    }, function(data) {
        alert(data);
    })      
}]);

app.controller('AddController', ['$scope', '$http', '$location', 'getData', function($scope, $http, $location, getData) {
    getData().then(function(data) {
        if ( !dataList ) {
            dataList = data;
        }
        $scope.title = '';
        $scope.content = '';
        $scope.add = function() {
            var obj = {
                id: dataList.length + 1,
                title: $scope.title,
                content: $scope.content,
                date: +new Date()
            };
            var url = 'http://i.ngroute.com/main/add';
            var postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: function(obj) {
                    return $.param(obj);
                }
            };

            $http.post(url, obj, postCfg).then(function(res) {           
                dataList.push(obj);
                console.log(dataList);
                $location.path('list');
            }, function() {
                alert('提交失败，重新提交');
            });

        };
    }, function(data) {
        alert(data);
    })

    
}]);
