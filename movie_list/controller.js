(function () {
    var module = angular.module('app.movieList', ['app.model', 'app.services.utility']);
    module.controller('movieListController', [
        '$scope', '$route', '$routeParams', 'appModel', 'appUtility',
        function ($scope, $route, $routeParams, appModel, appUtility) {
            // 获取当前的页数
            var page = $routeParams.page;
            // 获取当前的起始条目和一次获取的条目数
            var start = (page - 1) * 12;
            var count = 12;

            var vm = $scope.vm = {};

            // 判断是不是正在加载中
            vm.loading = true;

            // 翻页器
            var buildUrl = function (category, page) {
                return `#/${category}/${page}`
            };
            var buildPager = function () {
                var total = appUtility.total($routeParams.category);
                var maxPage = total % count == 0 ? total / count : Math.floor(total / count) + 1;
                var next = page >= maxPage ? maxPage : page - 0 + 1;
                var prev = page <= 1 ? 1 : page - 1;
                var categoryStr;

                switch ($routeParams.category) {
                    case 'in_theaters':
                        categoryStr = '正在热映';
                        break;
                    case 'coming_soon':
                        categoryStr = '即将上映';
                        break;
                    case 'top250':
                        categoryStr = 'top250';
                        break;
                    default:
                        categoryStr = '正在热映';
                }
                var pager = vm.pager = {
                    next: buildUrl($routeParams.category, next),
                    prev: buildUrl($routeParams.category, prev),
                    category: categoryStr,
                    curr: page,
                    max: maxPage,
                };
            };

            switch ($routeParams.category) {
                case 'in_theaters':
                    appModel.getInTheaters(start, count, function (data) {
                        vm.data = data;
                        vm.loading = false;
                        appUtility.total($routeParams.category, data.total);
                        buildPager();
                    });
                    break;
                case 'coming_soon':
                    appModel.getComingSoon(start, count, function (data) {
                        vm.data = data;
                        vm.loading = false;
                        appUtility.total($routeParams.category, data.total);
                        buildPager();

                    });
                    break;
                case 'top250':
                    appModel.getTop250(start, count, function (data) {
                        vm.data = data;
                        vm.loading = false;
                        appUtility.total($routeParams.category, data.total);
                        buildPager();

                    });
                    break;
                default:
                    appModel.getInTheaters(start, count, function (data) {
                        vm.data = data;
                        vm.loading = false;
                        appUtility.total($routeParams.category, data.total);
                        buildPager();

                    });
            }
            console.log('hello');
            console.log($routeParams);
        }
    ])
})();