angular.module('WebApiApp').controller('QuanLyKhoHangController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout',
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
        $rootScope.LoadKhoHang = function () {
            $http({
                method: 'GET',
                url: '/api/KhoHang/Load',
                params: {
                    searchKey: $scope.Paging.searchKey,
                    pageSize: $scope.Paging.pageSize,
                    pageNumber: $scope.Paging.currentPage
                }
            }).then(function successCallback(response) {
                $scope.listKhoHang = response.data.listKhoHang;
                $scope.Paging.totalCount = response.data.totalCount;
                $scope.Paging.pageStart = response.data.pageStart;
                $scope.Paging.pageEnd = response.data.pageEnd;
                $scope.Paging.totalPage = response.data.totalPage;

            }, function errorCallback(response) {
                toastr.error('Có lỗi xảy ra trong quá trình tải dữ liệu', 'Thông báo');
            });
        };
        $scope.openModelKhoHang = function (item, type) {
            $scope.modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                animation: true,
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views-client/template/QLBH/Modal/ModalQLKho.html?bust=' + Math.random().toString(36).slice(2),
                controller: 'ModelKhoHangHandlerController',
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
        $scope.DeleteKhoHang = function (Id) {
            if (confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')) {
                $http({
                    method: 'POST',
                    url: '/api/KhoHang/Delete?Id=' + Id
                }).then(function successCallback(response) {
                    toastr.success('Xóa dữ liệu thành công', 'Thông báo');
                    $rootScope.LoadKhoHang();
                }, function errorCallback(response) {
                    toastr.error('Không xóa được dữ liệu', 'Thông báo');
                });
            }
        }
        $scope.PrePage = function () {
            if ($scope.Paging.currentPage > 1) {
                $scope.Paging.currentPage = $scope.Paging.currentPage - 1;
                $rootScope.LoadKhoHang();
            }
        }
        $scope.NextPage = function () {
            if ($scope.Paging.currentPage < $scope.Paging.totalPage) {
                $scope.Paging.currentPage = $scope.Paging.currentPage + 1;
                if ($scope.Paging.currentPage == $scope.Paging.totalPage) {
                    $scope.Paging.currentPage == $scope.Paging.totalPage
                }
                $rootScope.LoadKhoHang();
            }
        }
        $scope.$on('$viewContentLoaded', function () {
            $rootScope.LoadKhoHang();
        });
    }]);

angular.module('WebApiApp').controller('ModelKhoHangHandlerController', function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;
    $scope.OnLoad = function () {
        ComponentsSelect2.init();
        $scope.GetHang();
    };
    $scope.GetHang = function () {
        $http({
            method: 'GET',
            url: '/api/Hang/GetAll',
        }).then(function successCallback(response) {
            $scope.ListHang = response.data;
        }, function errorCallback(response) {
        });
    }
    $scope.SaveModal = function () {
        if (typeof $scope.item == 'undefined') {
            toastr.error('Chưa cập nhật số liệu', 'Thông báo');
            return;
        }
        $http({
            method: 'POST',
            url: '/api/KhoHang/Update',
            data: $scope.item
        }).then(function successCallback(response) {
            toastr.success('Cập nhật dữ liệu thành công', 'Thông báo');
            $uibModalInstance.close('save');
            $rootScope.LoadKhoHang();
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            $scope.LoadError($scope.itemError.ModelState);
        });
    };
    $scope.CheckCode = function (_FCode) {
        if (_FCode.trim().length > 0) {
            $http({
                method: 'POST',
                url: '/api/KhoHang/CheckCode?FCode=' + _FCode
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