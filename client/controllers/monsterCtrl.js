var monsterCtrl = angular.module('monsterCtrl', []);

monsterCtrl.controller('monsterCtrl', ['$scope', '$route', '$http', 'authService', 'routes',
    function ($scope, $http, authService, routes) {

    $scope.checked = false;
    $scope.monster = '';
    $scope.Math = window.Math;
    var idArray = [];


    $scope.$on('$routeChangeStart',
        function (event, next, current) {
            console.log(next);
            authService.getUserStatus();
            if (next.$$route.access.restricted && !authService.isLoggedIn()) {
                $location.path('/login');
                $route.reload();
            }
    });

    load = function () {
        routes.getprofile().success(function (data) {
            $scope.monsters = data;
            $scope.todoTask = 'Voer een taak in...';
            console.log($scope.monsters);
        });
    };

    $scope.save = function () {
        console.log($scope.monster);
            routes.editprofile($scope.monster)
                .success(function () {
                    load();
                });
            $scope.monster = '';
    };

    $scope.delete = function (id) {
        var li = document.getElementById(id);
        li.className = 'todo animated fadeOut';
        setTimeout(function() {
            routes.delete(id)
            .success(function (data) {
                load();
            });
        }, 600);
    };

    $scope.deleteAll = function () {
        for (var i = 0; i < idArray.length; i++) {
            monsterService.delete(idArray[i])
                .success(function (data) {
                    load();
                });
        }
        idArray = [];
    };

    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i] == obj) {
                return true;
            }
        }
        return false;
    };

    $scope.addId = function (id, $index) {
        if (idArray.contains(id)) {
            var temp;
            for (var i = 0; i < idArray.length; i++) {
                if (idArray[i] == id) {
                    temp = i;
                }
            }
            idArray.splice(temp, 1);
        } else {
            idArray.push(id);
        }
    };

}]);













