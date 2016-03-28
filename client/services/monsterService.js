'use strict';

var monsterService = angular.module('monsterService', []);

monsterService.factory('authService', ['$http', function ($http) {

    var user = null;

    return ({
        isLoggedIn: isLoggedIn,
        getUserStatus: getUserStatus
    });

    function isLoggedIn() {
        if (user) {
            return true;
        } else {
            return false;
        }
    };

    function getUserStatus() {
        $http.get('/status')
            .success(function (data) {
                if (data.status) {
                    user = true;
                } else {
                    user = false;
                }
            })
            .error(function (data) {
                user = false;
            });
    };
}]);

monsterService.factory('routes', ['$http', function ($http) {

    return {
        getprofile: function (userId) {
            return $http.get('/finduser/' + userId);
        },
        editprofile: function () {
            return $http.post('/editprofile/' + userId, userEdit);    
        },
        delete: function (id) {
            return $http.delete('/delete/' + id);
        }
    };
    
}]);