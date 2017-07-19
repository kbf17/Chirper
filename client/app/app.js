
    var app = angular.module('myApp', ["ngRoute",]);

    app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "../views/home.html"
        })
        .when("/list", {
            templateUrl : "../views/list.html",
            // controller: "ChirpsController"
        })
        .when("/single/:id", {
            templateUrl: '../views/single.html',
            // controller: SingleController

        })
    });


    app.controller('ChirpsController', function($scope, $http, $location) {
        $http.get("http://localhost:3000/api/chirps")
        .then(function(response){
            $scope.chirpList = response.data;
            console.log('found');
            console.log($scope.chirpList);   
        })
        $scope.ClickMe = function(id){
            $location.path('/single/' + id)
        }
    });

    app.controller('SingleController', ['$scope', '$routeParams', function($scope, $routeParams, $http){
        console.log($routeParams.id);
        console.log($routeParams);
        id = $routeParams.id;
        
     var url = "http://localhost:3000/api/chirps/"
        $http.get(url+id);
        // .then(function(response){
        //     console.log('single');
        // })
    }])

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

    app.controller('DeleteController', function($scope, $http){
        var id = $scope.id;
        $scope.DeleteChirp = function(){
            $http.delete("http://localhost:3000/api/chirps/:" +id)
            .then(function(){
                console.log('yep');
            })
        }
    })




