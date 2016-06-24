(function () {
    // 自定义服务：用于jsonp访问
    var module = angular.module('app.services.jsonp', []);
    module.factory('myJsonp', ['$window','$rootScope',function ($window,$rootScope) {
        var count = 0;
        return function (path, fn) {
            var callbackName = '_jsonpCallback_' + count++; // jsonp回调函数名
            var url = path.replace('JSONP_CALLBACK', callbackName); // 对原地址进行替换

            // 创建脚本标签，并给地址
            var scriptElement = $window.document.createElement('script');
            scriptElement.src = url;
            // 把脚本标签放到网页上（获取脚本并执行）
            $window.document.body.appendChild(scriptElement);

            // 远程服务器发回来的脚本会执行我们给定的回调函数，在window上创建回调函数
            $window[callbackName] = function(data){
                fn(data);
                // 因为我们更新数据的事件AngularJS不知道，所以我们要通知AngularJS。直接通知最上层的作用域就行了。
                $rootScope.$apply();
                $window.document.body.removeChild(scriptElement);
            }

        }
    }])
})();