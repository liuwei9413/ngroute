<!doctype html>
<html lang="en" ng-app="myApp">
<head>
    <meta charset="UTF-8">
    <title>路由练习——文章发布系统</title>
    <link rel="stylesheet" href="css/style.css"/>
</head>
<body>
<script>
    // var newsList = <?= $newsList;?>;
</script>
<script type="text/ng-template" id="list.html">
    <table border="1" style="border-collapse: collapse">
        <tr>
            <td>id</td>
            <td>标题</td>
            <td>内容</td>
            <td>发布时间</td>
        </tr>
        <tr ng-repeat="news in newsList">
            <td>{{news.id}}</td>
            <td><a href="#/detail/{{news.id}}">{{news.title}}</a></td>
            <td>{{news.content}}</td>
            <td>{{news.date | date : 'yyyy-MM-dd HH:mm:ss' }}</td>
        </tr>
    </table>
</script>

<script type="text/ng-template" id="detail.html">
    <div class="detail">
        <div><a href="#/list">返回列表</a></div>
        <div><a href="#/edit/{{news.id}}">编辑</a></div>
        <h2>标题：<span>{{news.title}}</span></h2>
        <div>发布日期：<span>{{ news.date | date : 'yyyy-MM-dd HH:mm:ss' }}</span></div>
        <div style="background: #add8e6; margin: 10px 0;">正文：<span>{{news.content}}</span></div>
    </div>
</script>

<script type="text/ng-template" id="edit.html">
    <div class="edit">
        <div>标题：<input type="text" value="{{news.title}}" ng-model="news.title"/></div>
        <div>内容：<textarea cols="30" rows="10" style="vertical-align: top;" ng-model="news.content">{{news.content}}</textarea></div>
        <input type="button" value="提交" ng-click="update()">
    </div>
</script>

<script type="text/ng-template" id="add.html">
    <div class="add">
        <h2>添加文章</h2>
        <div>标题：<input type="text" ng-model="title" /></div>
        <div>内容：<textarea cols="30" rows="10" style="vertical-align: top;" ng-model="content"></textarea></div>
        <input type="button" value="提交" ng-click="add()">
    </div>
</script>

    <h1>文章发布系统</h1>
    <div id="content">
        <div class="left">
            <ul>
                <li><a href="#/list">文章列表</a></li>
                <li><a href="#/add">发布文章</a></li>
            </ul>
        </div>
        <div class="right">
            <input id="newsList" type="hidden" value='<?= $newsList;?>'>
            <div ng-view></div>
        </div>
    </div>
    
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script src="js/angular.min.js"></script>
    <script src="js/angular-route.min.js"></script>
    <script type="text/javascript" src="js/index.js"></script>    
</body>
</html>