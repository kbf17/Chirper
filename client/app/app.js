
    var app = angular.module('myApp', ["ngRoute",]);

    app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "../views/home.html"
        })
        .when("/list", {
            templateUrl : "../views/list.html",
            controller: "ChirpsController"
        })
        .when("/single", {
            templateUrl : "../views/single.html",

        })
    });


    app.controller('ChirpsController', function($scope, $http) {
        $http.get("http://localhost:3000/api/chirps")
        .then(function(response){
            $scope.chirpList = response.data;
            console.log('found');
            console.log($scope.chirpList);   
        })
        // .error(function(response){
        //     confirm("Uh oh! Cheeps not found!" + "Refresh stream?");
        // })
    });

    app.controller('SingleController', function($scope, $http){
        $http.get("http://localhost:3000/api/chirps/:" + id)
        .then(function(response){
            $scope.singleChirp = response.data;
            console.log('single');
        })
    })

    app.controller('PushController', function($scope, $http){
        $scope.SendChirp = function(){
            var data = ({
                user : $scope.user,
                message : $scope.message
            });
            $http.post("http://localhost:3000/api/chirps", data)
            .then(function(response){
                console.log(response);
            });
        }
    });




