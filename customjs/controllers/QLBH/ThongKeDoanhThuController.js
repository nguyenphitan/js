angular.module('WebApiApp').controller('ThongKeDoanhThuController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout',
    function ($rootScope, $scope, $http, $cookies, $uibModal, $settings, $timeout) {
        $rootScope.LoadDoanhThu = function () {
            $http({
                method: 'GET',
                url: '/api/ThongKe/DoanhThu?Year=' + $scope.Year
            }).then(function successCallback(response) {
                $scope.listDoanhThu = response.data;
                $scope.listDoanhThu.forEach(function (value, key) {
                    if (value.DoanhThu != null) value.DoanhThu = value.DoanhThu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                })
            }, function errorCallback(response) {
                toastr.error('Có lỗi xảy ra trong quá trình tải dữ liệu', 'Thông báo');
            });
        };
        $scope.openModelChiTiet = function (item, type) {
            $scope.modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                animation: true,
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views-client/template/QLBH/Modal/ModalThongKeDT.html?bust=' + Math.random().toString(36).slice(2),
                controller: 'ModelChiTietHandlerController',
                controllerAs: 'vm',
                scope: $scope,
                backdrop: 'static',
                size: 'lg',
                index: 10000,
                resolve: {
                    item: function () { return item },
                    year: function () { return $scope.Year }
                }
            });

        };
        $scope.$on('$viewContentLoaded', function () {
            var date = new Date();
            $scope.Year = date.getFullYear();
            ComponentsSelect2.init();
            $('.date-picker').datepicker({
                rtl: App.isRTL(),
                format: 'yyyy',
                viewMode: "years",
                minViewMode: "years",
                orientation: "right",
                autoclose: true,
                minDate: 0
            });
            $('.date input,input').attr('autocomplete', 'off');
            $rootScope.LoadDoanhThu();
        });
    }]);

angular.module('WebApiApp').controller('ModelChiTietHandlerController', function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.Year = $scope.$resolve.year;
    $scope.SearchKey = "";
    $scope.OnLoad = function () {
        $scope.GetDoanhSo();
    };
    $scope.GetDoanhSo = function () {
        $http({
            method: 'GET',
            url: '/api/ThongKe/DoanhSoThang?Thang=' + $scope.item.Thang + '&Loai=' + $scope.SearchKey + '&Year=' + $scope.Year,
        }).then(function successCallback(response) {
            $scope.ListDoanhSo = response.data;
            $scope.ListDoanhSo.forEach(function (value, key) {
                value.ThanhTien = value.ThanhTien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            })
        }, function errorCallback(response) {
        });
    }
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    };
})