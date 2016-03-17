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

var newsLists = [
    { id: 1, title: '标题1111111111', content:'我是内容11111111我是内容11111111', date: new Date() },
    { id: 2, title: '标题2222222222', content:'我是内容22222222我是内容222222222222', date: new Date() },
    { id: 3, title: '标题3333333333', content:'我是内容3333333333我是内容333333333', date: new Date() },
    { id: 4, title: '标题444444444', content:'我是内容4444444444我是内容444444444', date: new Date() },
    { id: 5, title: '标题55555555555', content:'我是内容5555555我是内容5555555555', date: new Date() },
    { id: 6, title: '标题66666666', content:'我是内容666666666我是内容6666666666', date: new Date() }
];

app.controller('ListController', ['$scope', function($scope) {
    $scope.newsLists = newsLists;
}]);

app.controller('DetailController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.news = newsLists[$routeParams.id - 1];
}]);

app.controller('EditController', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
    $scope.news = newsLists[$routeParams.id - 1];

    $scope.update = function() {
        $scope.news.date = new Date();
        newsLists[$routeParams.id - 1] = $scope.news;
        $location.path('list');
    };
}]);

app.controller('AddController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.title = '';
    $scope.content = '';

    $scope.add = function() {
        newsLists.push({
            id: newsLists.length + 1,
            title: $scope.title,
            content: $scope.content,
            date: new Date()
        });

        $http.post('http://i.ngroute.com/main/add', {
            id: newsLists.length + 1,
            title: $scope.title,
            content: $scope.content,
            date: new Date()
        }).then(function(res) {
            console.log(res);
        });

        // var dtd = $.Deferred();
        // dtd.when( $.post('http://i.ngroute.com/main/add' ), {
        //     id: newsLists.length + 1,
        //     title: $scope.title,
        //     content: $scope.content,
        //     date: new Date()
        // }).then(function(res) {
        //     console.log(res);
        // });

        // $.post('http://i.ngroute.com/main/add', {
        //      id: newsLists.length + 1,
        //     title: $scope.title,
        //     content: $scope.content,
        //     date: new Date()
        // }, function(res) {
        //     console.log(res);
        // }, 'json');
        

        $location.path('list');
    };
}]);































