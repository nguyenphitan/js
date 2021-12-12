angular.module('WebApiApp').controller('QuanLyKhachHangController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout',
    function ($rootScope, $scope, $http, $cookies, $uibModal, $settings, $timeout) {
        $scope.Paging = {
            searchKey: '',
            pageSize: 15,
            pageStart: 0,
            pageEnd: 0,
            totalCount: 0,
            totalPage: 0,
            currentPage: 1
        };
        $rootScope.LoadKhachHang = function () {
            $http({
                method: 'GET',
                url: '/api/KhachHang/Load',
                params: {
                    searchKey: $scope.Paging.searchKey,
                    pageSize: $scope.Paging.pageSize,
                    pageNumber: $scope.Paging.currentPage
                }
            }).then(function successCallback(response) {
                $scope.listKhachHang = response.data.listKhachHang,
                    $scope.Paging.totalCount = response.data.totalCount,
                    $scope.Paging.pageStart = response.data.pageStart,
                    $scope.Paging.pageEnd = response.data.pageEnd,
                    $scope.Paging.totalPage = response.data.totalPage

            }, function errorCallback(response) {
                toastr.error('Có lỗi xảy ra trong quá trình tải dữ liệu', 'Thông báo');
            });
        };
        $scope.openModelKhachHang = function (item, type) {
            $scope.modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                animation: true,
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views-client/template/QLBH/Modal/ModalQLKH.html?bust=' + Math.random().toString(36).slice(2),
                controller: 'ModelKhachHangHandlerController',
                controllerAs: 'vm',
                scope: $scope,
                backdrop: 'static',
                size: 'lg',
                index: 10000,
                resolve: {
                    item: function () { return item },
                    type: function () { return type }
                }
            });

        };
        $scope.openModelLichSu = function (item, type) {
            $scope.modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                animation: true,
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views-client/template/QLBH/Modal/ModalLSMH.html?bust=' + Math.random().toString(36).slice(2),
                controller: 'ModelLichSuHandlerController',
                controllerAs: 'vm',
                scope: $scope,
                backdrop: 'static',
                size: 'lg',
                index: 10000,
                resolve: {
                    item: function () { return item },
                    type: function () { return type }
                }
            });

        };
        $scope.DeleteKhachHang = function (Id) {
            if (confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')) {
                $http({
                    method: 'DELETE',
                    url: '/api/KhachHang/Delete?ID=' + Id
                }).then(function successCallback(response) {
                    toastr.success('Xóa dữ liệu thành công', 'Thông báo');
                    $rootScope.LoadKhachHang();
                }, function errorCallback(response) {
                    toastr.error('Không xóa được dữ liệu', 'Thông báo');
                });
            }
        }
        $scope.PrePage = function () {
            if ($scope.Paging.currentPage > 1) {
                $scope.Paging.currentPage = $scope.Paging.currentPage - 1;
                $rootScope.LoadKhachHang();
            }
        }
        $scope.NextPage = function () {
            if ($scope.Paging.currentPage < $scope.Paging.totalPage) {
                $scope.Paging.currentPage = $scope.Paging.currentPage + 1;
                if ($scope.Paging.currentPage == $scope.Paging.totalPage) {
                    $scope.Paging.currentPage == $scope.Paging.totalPage
                }
                $rootScope.LoadKhachHang();
            }
        }
        $scope.$on('$viewContentLoaded', function () {
            $rootScope.LoadKhachHang();
        });
    }]);

angular.module('WebApiApp').controller('ModelKhachHangHandlerController', function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;
    $scope.SoDienThoai = '';
    $scope.OnLoad = function () {
        ComponentsSelect2.init();
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            format: 'dd/mm/yyyy',
            orientation: "right",
            autoclose: true,
            minDate: 0
        });
        $('.date input,input').attr('autocomplete', 'off');
    };
    $scope.SaveModal = function () {
        if (typeof $scope.item == 'undefined') {
            toastr.error('Chưa cập nhật số liệu', 'Thông báo');
            return;
        }
        if ($scope.item.MaKhachHang == undefined || $scope.item.MaKhachHang == '') {
            toastr.error('Chưa nhập mã khách hàng', 'Thông báo');
            return;
        }
        if ($scope.item.TenKhachHang == undefined || $scope.item.TenKhachHang == '') {
            toastr.error('Chưa nhập họ tên', 'Thông báo');
            return;
        }
        $http({
            method: 'POST',
            url: '/api/KhachHang/Update',
            data: $scope.item
        }).then(function successCallback(response) {
            toastr.success('Cập nhật dữ liệu thành công', 'Thông báo');
            $uibModalInstance.close('save');
            $rootScope.LoadKhachHang();
        }, function errorCallback(response) {
        });
    };
    $scope.CheckCode = function (_FCode) {
        if (_FCode.trim().length > 0) {
            $http({
                method: 'POST',
                url: '/api/KhachHang/CheckCode?MaKH=' + _FCode
            }).then(function successCallback(response) {
                if (response.data == true) {
                    toastr.warning('Mã này đã tồn tại', 'Thông báo');
                }
                else {
                    toastr.success('Có thể sử dụng mã này', 'Thông báo');
                }
            }, function errorCallback(response) {

            });
        }
    };

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    };
})

angular.module('WebApiApp').controller('ModelLichSuHandlerController', function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;
    $scope.MaDonHang = '';
    $scope.pageStart= 0;
    $scope.OnLoad = function () {
        $scope.GetLichSu();
    };
    $scope.GetLichSu = function () {
        $http({
            method: 'GET',
            url: '/api/KhachHang/LichSuMuaHang?MaKhachHang=' + $scope.item.MaKhachHang + '&MaHoaDon=' + $scope.MaDonHang,
        }).then(function successCallback(response) {
            $scope.LichSuMuaHang = response.data.LichSu;
            $scope.LichSuMuaHang.forEach(function (value, key) {
                value.ThanhTien = value.ThanhTien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            })
            $scope.TongSoLuong = response.data.TongSoLuong;
            $scope.TongTien = response.data.TongTien;
            $scope.TongTien = $scope.TongTien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }, function errorCallback(response) {
        });
    };
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    };
})