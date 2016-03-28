'use strict';

var monsterApp = angular.module('monsterApp', ['rootCtrl', 'monsterService', 'ngRoute', 'ngDialog']);

monsterApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/rest.html',
            access: {restricted: false}
        })
        .when('', {
            templateUrl: '/views/index.html',
            access: {restricted: false}
        })
        .when('/login', {
            templateUrl: '/views/enter.html',
            access: {restricted: false}
        })
        .when('/user', {
            templateUrl: '/views/user.html',
            access: {restricted: false}
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

monsterApp.directive('fbTopnav', function () {
    return {
        restrict: 'A',
        transclude: true,
        templateUrl: 'views/topnav.html'
    };
});

monsterApp.directive('fbFooter', function () {
    return {
        restrict: 'A',
        transclude: true,
        templateUrl: 'views/footer.html'
    };
});