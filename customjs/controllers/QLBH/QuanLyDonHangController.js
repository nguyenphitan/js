angular.module('WebApiApp').controller('QuanLyDonHangController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout',
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
        $rootScope.LoadDonHang = function () {
            $http({
                method: 'GET',
                url: '/api/QLDonHang/Load',
                params: {
                    searchKey: $scope.Paging.searchKey,
                    pageSize: $scope.Paging.pageSize,
                    pageNumber: $scope.Paging.currentPage
                }
            }).then(function successCallback(response) {
                $scope.listDonHang = response.data.listHoaDon;
                    $scope.listDonHang.forEach(function (value, key) {
                        value.ThanhTien = value.ThanhTien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    });
                $scope.Paging.totalCount = response.data.totalCount;
                $scope.Paging.pageStart = response.data.pageStart;
                $scope.Paging.pageEnd = response.data.pageEnd;
                $scope.Paging.totalPage = response.data.totalPage
            }, function errorCallback(response) {
                toastr.error('Có lỗi xảy ra trong quá trình tải dữ liệu', 'Thông báo');
            });
        };
        $scope.openModelDonHang = function (item, type) {
            $scope.modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                animation: true,
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views-client/template/QLBH/Modal/ModalQLDH.html?bust=' + Math.random().toString(36).slice(2),
                controller: 'ModelDonHangHandlerController',
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
        $scope.DeleteDonHang = function (Id) {
            if (confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')) {
                $http({
                    method: 'POST',
                    url: '/api/QLDonHang/Delete?Id=' + Id
                }).then(function successCallback(response) {
                    toastr.success('Xóa dữ liệu thành công', 'Thông báo');
                    $rootScope.LoadDonHang();
                }, function errorCallback(response) {
                    toastr.error('Không xóa được dữ liệu', 'Thông báo');
                });
            }
        }
        $scope.PrePage = function () {
            if ($scope.Paging.currentPage > 1) {
                $scope.Paging.currentPage = $scope.Paging.currentPage - 1;
                $rootScope.LoadDonHang();
            }
        }
        $scope.NextPage = function () {
            if ($scope.Paging.currentPage < $scope.Paging.totalPage) {
                $scope.Paging.currentPage = $scope.Paging.currentPage + 1;
                if ($scope.Paging.currentPage == $scope.Paging.totalPage) {
                    $scope.Paging.currentPage == $scope.Paging.totalPage
                }
                $rootScope.LoadDonHang();
            }
        }
        $scope.$on('$viewContentLoaded', function () {
            $rootScope.LoadDonHang();
        });
    }]);

angular.module('WebApiApp').controller('ModelDonHangHandlerController', function ($rootScope, $scope, $http, $uibModalInstance, $uibModal) {
    $scope.Paging = {
        searchKey: '',
        pageSize: 3,
        pageStart: 0,
        pageEnd: 0,
        totalCount: 0,
        totalPage: 0,
        currentPage: 1
    };
    $scope.itemHD = $scope.$resolve.item;
    $scope.HangDT = '';
    $scope.TongSoLuong = 0;
    $scope.TongTien = 0;
    $scope.ListDT = [];
    $scope.onLoad = function () {
        ComponentsSelect2.init();
        if ($scope.itemHD != undefined) {
            $scope.LoadHoaDon($scope.itemHD.MaHoaDon);
        }
        else {
            $scope.LoadKhachHang();
            $scope.LoadNhanVien();
            $scope.LoadHang();
            $scope.LoadDienThoai("");
        }
    };
    $scope.type = $scope.$resolve.type;
    $scope.LoadHoaDon = function (MaHoaDon) {
        $http({
            method: 'GET',
            url: '/api/QLDonHang/LoadHoaDon?MaHoaDon=' + MaHoaDon,
        }).then(function successCallback(response) {
            $scope.item = response.data.HoaDon;
            $scope.ListDT = response.data.ListDT;
            $scope.TongSoLuong = response.data.TongSoLuong;
            $scope.TongTien = response.data.TongTien;
            $scope.LoadKhachHang();
            $scope.LoadNhanVien();
            $scope.LoadHang();
            $scope.LoadDienThoai("");
        }, function errorCallback(response) {
            toastr.error('Có lỗi xảy ra trong quá trình tải dữ liệu', 'Thông báo');
        });
    }
    $scope.LoadKhachHang = function () {
        $http({
            method: 'GET',
            url: '/api/KhachHang/GetAll',
        }).then(function successCallback(response) {
            $scope.ListKhachHang = response.data;
        }, function errorCallback(response) {
            toastr.error('Có lỗi xảy ra trong quá trình tải dữ liệu', 'Thông báo');
        });
    }
    $scope.LoadNhanVien = function () {
        $http({
            method: 'GET',
            url: '/api/NhanVien/GetAll',
        }).then(function successCallback(response) {
            $scope.ListNhanVien = response.data;
        }, function errorCallback(response) {
            toastr.error('Có lỗi xảy ra trong quá trình tải dữ liệu', 'Thông báo');
        });
    }
    $scope.LoadHang = function () {
        $http({
            method: 'GET',
            url: '/api/Hang/GetAll',
        }).then(function successCallback(response) {
            $scope.ListHang = response.data;
        }, function errorCallback(response) {
            toastr.error('Có lỗi xảy ra trong quá trình tải dữ liệu', 'Thông báo');
        });
    }
    $scope.LoadDienThoai = function (Hang) {
        $http({
            method: 'GET',
            url: '/api/KhoHang/GetList?Hang=' + Hang,
        }).then(function successCallback(response) {
            $scope.ListDienThoai = response.data;
        }, function errorCallback(response) {
            toastr.error('Có lỗi xảy ra trong quá trình tải dữ liệu', 'Thông báo');
        });
    }
    $scope.ThemDienThoai = function (MaDT) {
        $scope.ListDienThoai.forEach(function (value, key) {
            if (value.MaDienThoai == MaDT) {
                $scope.ListDT.push({
                    MaDienThoai: MaDT,
                    TenDienThoai: value.TenDienThoai,
                    SoLuong: 1,
                    DonGia: value.DonGia,
                    ThanhTien: value.DonGia
                });
            }
        })
        $scope.TongSoLuong = 0;
        $scope.TongTien = 0;
        $scope.ListDT.forEach(function (value, key) {
            $scope.TongSoLuong += value.SoLuong;
            $scope.TongTien += (value.SoLuong * value.DonGia);
        })
    }
    $scope.changeValue = function (x) {
        $scope.TongSoLuong = 0;
        $scope.TongTien = 0;
        $scope.ListDT.forEach(function (value, key) {
            $scope.TongSoLuong += value.SoLuong;
            $scope.TongTien += (value.SoLuong * value.DonGia);
        })
    }
    $scope.DeleteDT = function (x) {
        $scope.TongSoLuong = 0;
        $scope.TongTien = 0;
        $scope.ListDT.forEach(function (value, key) {
            if (value.MaDienThoai == x) $scope.ListDT.splice(key, 1);
        })
        $scope.ListDT.forEach(function (value, key) {
            $scope.TongSoLuong += value.SoLuong;
            $scope.TongTien += (value.SoLuong * value.DonGia);
        })
    }

    $scope.SaveModal = function () {
        if (typeof $scope.item == 'undefined') {
            toastr.error('Chưa cập nhật số liệu', 'Thông báo');
            return;
        }
        if ($scope.item.MaKhachHang == undefined || $scope.item.MaKhachHang == '') {
            toastr.error('Chưa chọn khách hàng', 'Thông báo');
            return;
        }
        if ($scope.item.MaNhanVien == undefined || $scope.item.MaNhanVien == '') {
            toastr.error('Chưa chọn nhân viên', 'Thông báo');
            return;
        }
        if ($scope.TongTien == 0) {
            toastr.error('Chưa có sản phẩm', 'Thông báo');
            return;
        }
        if ($scope.item.PhuongThucThanhToan == undefined || $scope.item.PhuongThucThanhToan == '') {
            toastr.error('Chưa chọn phương thức thanh toán', 'Thông báo');
            return;
        }
        var list = {
            listDienThoai: $scope.ListDT,
            hoadon: $scope.item
        }
        $http({
            method: 'POST',
            url: '/api/QLDonHang/Update',
            data: list
        }).then(function successCallback(response) {
            toastr.success('Cập nhật dữ liệu thành công', 'Thông báo');
            $uibModalInstance.close('save');
            $rootScope.LoadDonHang();
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            $scope.LoadError($scope.itemError.ModelState);
        });
    };
    $scope.CheckCode = function (_FCode) {
        if (_FCode.trim().length > 0) {
            $http({
                method: 'POST',
                url: '/api/QLDonHang/CheckCode?FCode=' + _FCode
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
    $scope.openModelKhachHang = function (item, type) {
        if ($scope.item == undefined) {
            toastr.warning('Vui lòng nhập mã đơn hàng!', 'Thông báo');
            return;
        }
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
    $rootScope.AutoSelectKH = function (FCode) {
        $scope.LoadKhachHang();
        $scope.item.MaKhachHang = FCode;
    }
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    };

})

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
            $rootScope.AutoSelectKH($scope.item.MaKhachHang);
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