angular.module('WebApiApp').controller('QuanLyNhanVienController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout',
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
        $rootScope.LoadNhanVien = function () {
            $http({
                method: 'GET',
                url: '/api/NhanVien/Load',
                params: {
                    searchKey: $scope.Paging.searchKey,
                    pageSize: $scope.Paging.pageSize,
                    pageNumber: $scope.Paging.currentPage
                }
            }).then(function successCallback(response) {
                $scope.listNhanVien = response.data.listNhanVien,
                    $scope.Paging.totalCount = response.data.totalCount,
                    $scope.Paging.pageStart = response.data.pageStart,
                    $scope.Paging.pageEnd = response.data.pageEnd,
                    $scope.Paging.totalPage = response.data.totalPage

            }, function errorCallback(response) {
                toastr.error('Có lỗi xảy ra trong quá trình tải dữ liệu', 'Thông báo');
            });};
        $scope.openModelNhanVien = function (item, type) {
            $scope.modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                animation: true,
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views-client/template/QLBH/Modal/ModalQLNV.html?bust=' + Math.random().toString(36).slice(2),
                controller: 'ModelNhanVienHandlerController',
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
        $scope.DeleteNhanVien = function (Id) {
            if (confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')) {
                $http({
                    method: 'DELETE',
                    url: '/api/NhanVien/Delete?ID=' + Id
                }).then(function successCallback(response) {
                    toastr.success('Xóa dữ liệu thành công', 'Thông báo');
                    $rootScope.LoadNhanVien();
                }, function errorCallback(response) {
                    toastr.error('Không xóa được dữ liệu', 'Thông báo');
                });
            }
        }
        $scope.PrePage = function () {
            if ($scope.Paging.currentPage > 1) {
                $scope.Paging.currentPage = $scope.Paging.currentPage - 1;
                $rootScope.LoadNhanVien();
            }
        }
        $scope.NextPage = function () {
            if ($scope.Paging.currentPage < $scope.Paging.totalPage) {
                $scope.Paging.currentPage = $scope.Paging.currentPage + 1;
                if ($scope.Paging.currentPage == $scope.Paging.totalPage) {
                    $scope.Paging.currentPage == $scope.Paging.totalPage
                }
                $rootScope.LoadNhanVien();
            }
        }
        $scope.$on('$viewContentLoaded', function () {
            $rootScope.LoadNhanVien();
        });
    }]);

angular.module('WebApiApp').controller('ModelNhanVienHandlerController', function ($rootScope, $scope, $http, $uibModalInstance) {
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
        if ($scope.item != undefined) {
            $scope.GetSDT($scope.item.MaNhanVien);
        }
        else $scope.ListSDT = [];
    };
    $scope.GetSDT = function (MaNV) {
        $http({
            method: 'GET',
            url: '/api/NhanVien/GetSDT?MaNV=' + MaNV,
        }).then(function successCallback(response) {
            $scope.ListSDT = response.data;
        }, function errorCallback(response) {
        });
    }
    $scope.DelSDT = function (SDT) {
        $scope.ListSDT.forEach(function (value, key) {
            if (value == SDT) $scope.ListSDT.splice(key, 1);
        })
    }
    $scope.AddSDT = function (SDT) {
        $scope.ListSDT.push(SDT);
        $scope.SoDienThoai = '';
    }
    $scope.SaveModal = function () {
        if (typeof $scope.item == 'undefined') {
            toastr.error('Chưa cập nhật số liệu', 'Thông báo');
            return;
        }
        if ($scope.item.MaNhanVien == undefined || $scope.item.MaNhanVien == '') {
            toastr.error('Chưa nhập mã nhân viên', 'Thông báo');
            return;
        }
        if ($scope.item.TenNhanVien == undefined || $scope.item.TenNhanVien == '') {
            toastr.error('Chưa nhập họ tên', 'Thông báo');
            return;
        }
        var ls = {
            nhanvien: $scope.item,
            listSDT: $scope.ListSDT
        };
        $http({
            method: 'POST',
            url: '/api/NhanVien/Update',
            data: ls
        }).then(function successCallback(response) {
            toastr.success('Cập nhật dữ liệu thành công', 'Thông báo');
            $uibModalInstance.close('save');
            $rootScope.LoadNhanVien();
        }, function errorCallback(response) {
        });
    };
    $scope.CheckCode = function (_FCode) {
        if (_FCode.trim().length > 0) {
            $http({
                method: 'POST',
                url: '/api/NhanVien/CheckCode?MaNV=' + _FCode
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