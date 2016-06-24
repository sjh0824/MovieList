var app = angular.module('app.main', ['app.model','ngRoute','app.movieDetail','app.movieList']);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/detail/:id',{
            templateUrl:'./movie_detail/template.html',
            controller:'movieDetailController'
        })
        .when('/:category/:page',{
            templateUrl:'./movie_list/template.html',
            controller:'movieListController'
        })
        .otherwise({redirectTo:'/in_theaters/1'});
}]);
app.run(['appModel', function (appModel) {
    appModel.getTop250(0,10,function(data){
        console.log('model test',data);
    })
}]);
