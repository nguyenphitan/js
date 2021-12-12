var module = angular.module('WebApiApp');
module.factory('PlanService', ['$http', function ($http) {
    var factory = {};

    factory.HistoryAprovePlan = function (FPlan, success, error) {
        $http({
            method: 'GET',
            url: '/api/Plans/HistoryApprovePlan?Code=' + FPlan
        }).then(function successCallback(response) {
            return success(response.data);

        }, function errorCallback(response) {
            return error(response.data);
        });
    }
    factory.Plans = function (Paging, success, error) {
        if (Paging.Year == '') Paging.Year = new Date().getFullYear();
        if (Paging.currentPage == 0 || Paging.currentPage > Paging.totalPage || Paging.currentPage == '')
            Paging.currentPage = 1;

        $http({
            method: 'GET',
            url: '/api/Plans/GetAllPlans?pageNumber=' + Paging.currentPage
                + '&pageSize=' + Paging.pageSize
                + '&Year=' + Paging.Year
                + '&BranhCode=' + Paging.BranhCode
                + '&searchKey=' + Paging.searchKey
                + '&statusSend=' + Paging.Send  // 1
                + '&approve=' + Paging.Approve // 0 chưa duyệt - 1 đã duyệt
                + '&PhanLoai=0'
        }).then(function successCallback(response) {
            return success(response.data);
        }, function errorCallback(response) {
            return error(response.data);
        });

    }

    factory.PlanBS = function (Paging, success, error) {
        if (Paging.Year == '') Paging.Year = new Date().getFullYear();
        if (Paging.currentPage == 0 || Paging.currentPage > Paging.totalPage || Paging.currentPage == '')
            Paging.currentPage = 1;

        $http({
            method: 'GET',
            url: '/api/Plans/GetAllPlanBS?pageNumber=' + Paging.currentPage
                + '&pageSize=' + Paging.pageSize
                + '&Year=' + Paging.Year
                + '&BranhCode=' + Paging.BranhCode
                + '&searchKey=' + Paging.searchKey
                + '&statusSend=' + Paging.Send  // 1
                + '&approve=' + Paging.Approve // 0 chưa duyệt - 1 đã duyệt
                + '&PhanLoai=0'
        }).then(function successCallback(response) {
            return success(response.data);
        }, function errorCallback(response) {
            return error(response.data);
        });

    }
    return factory;
}]);

