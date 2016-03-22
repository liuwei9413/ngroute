define(['controllers/controllers'], function(controllers) {//返回一个controllers模块 在此模块下自定义控制器
	console.log(5);
	//数据列表
	var dataList;
	//新闻列表页
	controllers.controller('ListController', ['$scope', '$http', 'getData', function($scope, $http, getData) {
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
	controllers.controller('DetailController', ['$scope', '$routeParams', '$http', 'getData', function($scope, $routeParams, $http, getData) {
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
	controllers.controller('EditController', ['$scope', '$location', '$routeParams', '$http', 'getData', function($scope, $location, $routeParams, $http, getData) {
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
	controllers.controller('AddController', ['$scope', '$http', '$location', 'getData', function($scope, $http, $location, getData) {  
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
 