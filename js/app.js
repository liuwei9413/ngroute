define(['angular', 'angular-route', './controllers/index'], function (angular) {
    console.log(2);
    return angular.module('app', ['ngRoute', 'controllers']);
});