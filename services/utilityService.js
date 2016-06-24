(function () {
    // 自定义服务：用于jsonp访问
    var module = angular.module('app.services.utility', []);
    module.factory('appUtility', ['$window', '$rootScope', function ($window, $rootScope) {
        var totalCounts = {
            top250: 0,
            in_theaters: 0,
            coming_soon: 0
        };
        return {
            total: function (category, value) {
                if (value === undefined) {
                    return totalCounts[category];
                } else {
                    return totalCounts [category] = value;
                }
            }
        }
    }])
})();