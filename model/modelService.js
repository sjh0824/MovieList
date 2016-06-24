(function () {
    // Model层：管理了数据
    var module = angular.module('app.model', ['app.services.jsonp']);
    // 自定义的服务
    module.factory('appModel', ['myJsonp', function (jsonp) {
        return {
            // Top250的数据的获取
            getTop250: function (start, count,callback) {
                var url = `http://api.douban.com/v2/movie/top250?start=${start}&count=${count}&callback=JSONP_CALLBACK`;
                jsonp(url,function(data){
                    callback(data);
                })
            },
            // 正在热映榜单数据的获取
            getInTheaters: function (start, count,callback) {
                var url = `http://api.douban.com/v2/movie/in_theaters?start=${start}&count=${count}&callback=JSONP_CALLBACK`;
                jsonp(url,function(data){
                    callback(data);
                })
            },
            // 即将上映....
            getComingSoon: function (start, count,callback) {
                var url = `http://api.douban.com/v2/movie/coming_soon?start=${start}&count=${count}&callback=JSONP_CALLBACK`;
                jsonp(url,function(data){
                    callback(data);
                })
            },
            // 电影的详细信息
            getSubject:function(id,callback){
                var url = `http://api.douban.com/v2/movie/subject/${id}?&callback=JSONP_CALLBACK`;
                jsonp(url,function(data){
                    callback(data);
                })
            }
        }
    }])

})();