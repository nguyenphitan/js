angular.module('WebApiApp').controller("ModelPositionHandlerController", function ($rootScope, $scope, $http, $uibModalInstance, dataShare) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;
    //new
    try { $scope.check = $scope.$resolve.check; }
    catch (e) { }
    //end new
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        if (typeof $scope.item == 'undefined') {
            $scope.item = {};

        }
        if (typeof $scope.item.Id == 'undefined' || $scope.item.Id == 0) {

            $http({
                method: 'POST',
                url: '/api/Positions',
                data: $scope.item
            }).then(function successCallback(response) {
                //new
                try {
                    if ($scope.check == '1') dataShare.saveCV($scope.item.FName);
                }
                catch (e) { }
                // end new
                $rootScope.$emit("Loadcv", {});
                $rootScope.$emit("GetAllChucVu", {});
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
                $scope.cancelModal()


            }, function errorCallback(response) {
                $scope.itemPositionError = response.data;
                $scope.LoadError($scope.itemPositionError.ModelState);
            });



        }
        else {
            $http({
                method: 'PUT',
                url: '/api/Positions/' + $scope.item.Id,
                data: $scope.item
            }).then(function successCallback(response) {
                //console.log(response);
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công Id = ' + $scope.item.Id + ' !', 'Thông báo');
                $rootScope.$emit("GetAllChucVu", {});
                $rootScope.$emit("Loadcv", {});
                $scope.cancelModal();
            }, function errorCallback(response) {
                $scope.itemPositionError = response.data;
                $scope.LoadError($scope.itemPositionError.ModelState);
            });
        }

    }
    $scope.SaveAndNew = function () {

        if (typeof $scope.item == 'undefined') {
            $scope.item = {};

        }
        if (typeof $scope.item.Id == 'undefined' || $scope.item.Id == 0) {

            $http({
                method: 'POST',
                url: '/api/Positions',
                data: $scope.item
            }).then(function successCallback(response) {
                //new
                try {
                    if ($scope.check == '1') dataShare.saveCV($scope.item.FName);
                }
                catch (e) { }
                // end new
                $rootScope.$emit("Loadcv", {});
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
                $rootScope.$emit("GetAllChucVu", {});
                $scope.item = []

            }, function errorCallback(response) {
                $scope.itemPositionError = response.data;
                $scope.LoadError($scope.itemPositionError.ModelState);
            });



        }
        else {
            $http({
                method: 'PUT',
                url: '/api/Positions/' + $scope.item.Id,
                data: $scope.item
            }).then(function successCallback(response) {
                //console.log(response);
                // this callback will be called asynchronously
                // when the response is available
                $rootScope.$emit("GetAllChucVu", {});
                toastr.success('Cập nhật dữ liệu thành công Id = ' + $scope.item.Id + ' !', 'Thông báo');
                $rootScope.$emit("Loadcv", {});
                $scope.item = [];
            }, function errorCallback(response) {
                $scope.itemPositionError = response.data;
                $scope.LoadError($scope.itemPositionError.ModelState);
            });
        }

    }
    $scope.ValidOnlyCode = function (FCode) {
        if (typeof $scope.item == 'undefined') {
            $scope.item = {};

        }
        $http({
            method: 'GET',
            url: '/api/CheckValidPosition/' + FCode,
        }).then(function successCallback(response) {

            if (response.data != 'undefined') {
                $scope.item = response.data;
                toastr.warning('Mã này đã tồn tại !', 'Thông báo');
            }
            else {

                $scope.item.Id = 0;
                $scope.item.FName = null;
                $scope.item.FDescription = null;
                toastr.success('Có thể sử dụng mã này !', 'Thông báo');
            }
        }, function errorCallback(response) {
        });
    }
    if ($scope.item != null) $scope.read = true;
    else {
        $scope.item = {};
        $scope.read = false;
    }

});
angular.module('WebApiApp').controller("ModalSangKienController", function ($rootScope, $scope, $http, $uibModalInstance, $q) {
    $scope.check = $scope.$resolve.check;
    $scope.DoiTuong = $scope.$resolve.item;
    if ($scope.check != null && $scope.check != '') $scope.item = $scope.check
    $scope.OnLoad = function () {
        App.initAjax();
        //ComponentsSelect2.init();
        if (jQuery().datepicker) {
            $('.date-picker').datepicker({
                rtl: App.isRTL(),
                format: 'dd/mm/yyyy',
                orientation: "left",
                autoclose: true
            });
        }
    }
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    var formdata = new FormData();
    $scope.ListFileUpLoad = [];
    $scope.getTheFiles = function ($files) {

        formdata = new FormData();
        angular.forEach($files, function (value, key) {
            $http({
                method: 'GET',
                url: '/api/AutoId/' + 'FILE',
            }).success(function (response, status, headers, config) {
                formdata.append(key, value, response.FName + '_' + value.name);
                var o = {
                    key: key,
                    DocName: '',
                    firstname: value.name,
                    filename: response.FName + '_' + value.name
                }
                $scope.ListFileUpLoad.push(o);
                $scope.item.File = response.FName + '_' + value.name
            }).error(function (response, status, headers, config) {
            });

        });
    }

    $scope.uploadFiles = function () {
        var request = {
            method: 'POST',
            url: 'api/TTKhenThuong/FileUpload',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        };
        $http(request).success(function (d) { }).error(function () {
            toastr.error('Có lỗi trong quá trình tải lên tệp đính kèm!', 'Thông báo');
        });
    }
    $scope.SaveModal = function () {

        if (typeof $scope.item == 'undefined') {
            toastr.error('Chưa cập nhật số liệu !', 'Thông báo');
            return;
        }
        if ($scope.DoiTuong != null) {
            $scope.item.QDKT = $scope.DoiTuong.SoQD;
            $scope.item.DoiTuong = $scope.DoiTuong.FCode;
            $scope.item.Type = $scope.DoiTuong.Type
            $http({
                method: 'POST',
                url: 'api/SangKien/Save',
                data: $scope.item
            }).then(function successCallback(response) {
                if (response.data == '-1') {
                    $scope.Error = response.data;
                } else {
                    toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');

                }
                //console.log(response.data);
            }, function errorCallback(response) {

                toastr.error('Không lưu được dữ liệu !', 'Thông báo');
            });
        } else {
            toastr.error('Không có thông tin đối tượng khen thưởng !', 'Thông báo');
        }
    }

});
angular.module('WebApiApp').controller("ModalViewSangKienController", function ($rootScope, $scope, $http, $uibModalInstance, $q) {

    $scope.check = $scope.$resolve.check;
    $scope.type = $scope.$resolve.type;
    $scope.DoiTuong = $scope.$resolve.item;
    $scope.TypeView = $scope.$resolve.item.TypeView
    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
        "Year": '0'
    };
    $scope.LoadSangKien = function () {
        if ($scope.check != 'OK') {
            $http({
                method: 'GET',
                url: 'api/SangKien/GetSangKien?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&Year=' + $scope.Paging.Year + '&searchKey=' + $scope.Paging.searchKey + '&DoiTuong=' + $scope.DoiTuong.FCode + '&QDKT=' + $scope.DoiTuong.Type
            }).then(function successCallback(response) {
                //console.log(response.data)
                $scope.SangKien = response.data.SangKien;
                $scope.Paging.totalCount = response.data.totalCount;
                $scope.Paging.pageStart = response.data.pageStart;
                $scope.Paging.totalPage = response.data.totalPage;

                $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
                $('#show_paginator').bootpag({
                    total: $scope.Paging.totalPage,
                    page: $scope.Paging.currentPage,
                    maxVisible: 10
                }).on('page', function (event, num) {
                    $scope.Paging.currentPage = num;
                    $scope.LoadSangKien();
                    if (num == null) num = 1
                });


            }, function errorCallback(response) {
                toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
            });
        }
        else {
            debugger
            $http({
                method: 'GET',
                url: 'api/SangKien/GetSangKienALL?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&Year=' + $scope.DoiTuong.NamKt + '&searchKey=' + $scope.Paging.searchKey + '&DoiTuong=' + $scope.DoiTuong.FCodeDt + '&QDKT=' + $scope.DoiTuong.FCode
            }).then(function successCallback(response) {
                //console.log(response.data)
                $scope.SangKien = response.data.SangKien;
                $scope.Paging.totalCount = response.data.totalCount;
                $scope.Paging.pageStart = response.data.pageStart;
                $scope.Paging.totalPage = response.data.totalPage;

                $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
                $('#show_paginator').bootpag({
                    total: $scope.Paging.totalPage,
                    page: $scope.Paging.currentPage,
                    maxVisible: 10
                }).on('page', function (event, num) {
                    $scope.Paging.currentPage = num;
                    $scope.LoadSangKien();
                    if (num == null) num = 1
                });


            }, function errorCallback(response) {
                toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
            });
        }

    }
    $scope.LoadSKYear = function () {

        $http({
            method: 'GET',
            url: 'api/SangKien/GetSKYear?DoiTuong=' + $scope.DoiTuong.FCode + '&Type=' + $scope.DoiTuong.Type
        }).then(function successCallback(response) {

            $scope.Year = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.DelSK = function (FCode) {
        if (confirm('Bạn có chắc chắn muốn xóa sáng kiến này?'))
            $http({
                method: 'POST',
                url: 'api/SangKien/Delete?ndkt=' + FCode
            }).then(function successCallback(response) {
                toastr.success('Đã xóa dữ liệu thành công!', 'Thông báo');
                $scope.LoadSangKien();
            }, function errorCallback(response) {
                toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
            });
    }
    $scope.LoadSKYear();
    $scope.LoadSangKien();
    $scope.OnLoad = function () {
        App.initAjax();
        //ComponentsSelect2.init();
        if (jQuery().datepicker) {
            $('.date-picker').datepicker({
                rtl: App.isRTL(),
                format: 'dd/mm/yyyy',
                orientation: "left",
                autoclose: true
            });
        }
    }
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


});
angular.module('WebApiApp').controller("ModalDSCaNhanController", function ($rootScope, $uibModal, $scope, $http, $uibModalInstance, $q) {
    $scope.item = $scope.$resolve.item;

    $scope.type = $scope.$resolve.type;
    //  $scope.DsDT = $scope.$resolve.check;
    // console.log($scope.DsDT);
    $scope.LoadArrayCN = function () {
        debugger
        if ($scope.item.FCode != undefined)
            $http({
                method: 'GET',
                url: 'api/CNDoiTuongKT/GetArrayCN',
                params: {
                    SoQD: $scope.item.SoQD,
                    TTKT: $scope.item.FCode
                }
            }).then(function successCallback(response) {
                // if (response.data.length != 0 )
                $scope.item.ArrayCN = response.data
            }, function errorCallback(response) {
                toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
            });
        else $scope.item.ArrayCN = []
    }
    $scope.CheckItemCN = function (tt) {
        ////debugger
        if ($scope.item.ArrayCN.includes(tt.FCode)) {
            tt.check = true;
        };

    }
    $scope.SelectItem = function () {
        angular.forEach($scope.item.ArrayDTCaNhan, function (value, key) {
            value.check = false
        });
        $scope.cancelModal()
    }
    $scope.Check = function (tt) {

        if (tt.check) {
            if ($rootScope.DsDT != null) {
                var check = $rootScope.DsDT.filter(t => t == tt.FCode);
                if (check != null && check.length > 0) {
                    toastr.warning('Đối tượng này đã có trong thông tin khen thưởng khác!', 'Thông báo');
                    tt.check = false;
                    return;
                } else {
                    if ($rootScope.DsDT == null) $rootScope.DsDT = [];
                    $rootScope.DsDT.push(tt.FCode);
                }
            }
            else {
                if ($rootScope.DsDT == null) $rootScope.DsDT = [];
                $rootScope.DsDT.push(tt.FCode);
            }

            if ($scope.item.ArrayCN == null) $scope.item.ArrayCN = [];
            $scope.item.ArrayCN.push(tt.FCode)
            if ($scope.item.ArrayDTCaNhan == null) $scope.item.ArrayDTCaNhan = [];
            $scope.item.ArrayDTCaNhan.push(tt)

        }
        else {
            if ($rootScope.DsDT != null) {
                var isExist = $rootScope.DsDT.indexOf(tt.FCode);
                if (isExist > -1)
                    $rootScope.DsDT.splice(isExist, 1);
            }
            //$scope.item.ArrayCN.splice(tt.index, 1)
            //$scope.item.ArrayDTCaNhan.splice(tt.index, 1)

            for (var i = $scope.item.ArrayDTCaNhan.length; i--;) {
                if ($scope.item.ArrayDTCaNhan[i].FCode === tt.FCode) {
                    $scope.item.ArrayDTCaNhan.splice(i, 1);
                    $scope.item.ArrayCN.splice(i, 1);
                }
            }

        }
    }
    $scope.CheckAll = function (item) {
        //console.log($rootScope.DsDT.DsDT)
        if (item.check) {

            angular.forEach(item, function (value, key) {
                //var indexDsDT = $rootScope.DsDT
                if ($scope.item.ArrayCN.includes(value.FCode) == false && $rootScope.DsDT.includes(value.FCode) == false) {
                    $scope.item.ArrayCN.push(value.FCode)
                    value.check = true;
                    $scope.item.ArrayDTCaNhan.push(value)
                }
            });
        } else {
            angular.forEach(item, function (value, key) {
                $scope.item.ArrayCN.splice(value.index, 1)
                value.check = false;
                $scope.item.ArrayDTCaNhan.splice(value.index, 1)
                if ($rootScope.DsDT.indexOf(value.FCode) > -1)
                    $rootScope.DsDT.splice($rootScope.DsDT.indexOf(value.FCode), 1);

            });
        }
    }

    //  try { $scope.LoadArrayCN() } catch{}
    $scope.search = {
        searchkey: '',
        dvc: '0'
    }
    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.LoadCaNhan = function () {

        // $scope.index = 1;
        $http({
            method: 'GET',
            url: 'api/CaNhan',
            params: {
                searchkey: $scope.search.searchkey,
                pageSize: $scope.pageSize,
                pageNumber: $scope.Paging.currentPage,
                dvc: $scope.search.dvc
            }
        }).then(function successCallback(response) {
            $scope.CaNhan = response.data.skt;

            angular.forEach($scope.CaNhan, function (value, key) {
                // $scope.CheckItemCN(value)

                if ($scope.item.ArrayCN == null) $scope.item.ArrayCN = [];
                if ($scope.item.ArrayCN.includes(value.FCode)) {
                    value.check = true;
                };
            });
            //  $scope.index = $scope.index + $scope.pageSize * (1 - 1);
            $scope.TotalPage = response.data.TotalPage;
            $scope.Paging.pageStart = response.data.pageStart;
            $('#PagingCaNhan').bootpag({
                total: $scope.TotalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $scope.LoadCaNhan();
                if (num == null) num = 1
                //   $scope.index = $scope.index + $scope.pageSize * (num - 1);
            });
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    //new
    $rootScope.$on("LoadCVDS", function () {
        $scope.GetAllChucVu();
        $scope.GetAllDonVi();
    })
    //end new
    $scope.GetAllChucVu = function () {
        $http({
            method: 'GET',
            url: 'api/CaNhan/GetChucVu',

        }).then(function successCallback(response) {
            $scope.ChucVu = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.GetAllDonVi = function () {
        $http({
            method: 'GET',
            url: 'api/CaNhan/GetDvi',

        }).then(function successCallback(response) {
            $scope.DonViAll = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.pageSize = $scope.displayPage[0].value;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.GettenDvc = function (a) {
        if ($scope.DonViAll != null) {
            var obj = $scope.DonViAll.filter(t => t.FCode == a);
            if (obj != null && obj.length > 0)
                return obj[0].TenDV;
            else return '';
        } else return '';

    }
    $scope.GettenChucVu = function (a) {
        if ($scope.ChucVu != null) {
            var obj = $scope.ChucVu.filter(t => t.FCode == a);
            if (obj != null && obj.length > 0)
                return obj[0].FName;
            else return '';
        } else return '';
    }
    $scope.DelTT = function (a) {
        if (confirm('Bạn có chắc chắn xóa bản ghi này ko ?')) {
            $http({
                method: 'POST',
                url: 'api/CaNhan/DelSo',
                data: a
            }).then(function successCallback(response) {
                if (response.data != 'Failed') {
                    toastr.success('Đã xóa dữ liệu thành công !', 'Thông báo');
                    $scope.LoadCaNhan();
                } else {
                    toastr.error('Không được phép xóa Cá nhân này vì đã thuộc Quyết định khen thưởng khác !', 'Thông báo');
                }

            }, function errorCallback(response) {
                toastr.warning('Có lỗi trong quá trình xóa dữ liệu!', 'Thông báo');
            });
        }
    }
    $rootScope.$on("LoadCaNhan", function () {
        $scope.LoadCaNhan();
        //     $scope.GetAllDonVi();
    })
    $scope.OnLoad = function () {
        $scope.LoadCaNhan();
        $scope.pageSize = $scope.displayPage[0].value;
        //ComponentsSelect2.init();
        $scope.GetAllDonVi();
        $scope.GetAllChucVu();
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            format: 'dd/mm/yyyy',
            orientation: "left",
            autoclose: true,
            minDate: 0
        });

    }

});
angular.module('WebApiApp').controller("ModalDSTapTheController", function ($rootScope, $scope, $http, $uibModalInstance, $uibModal) {
    //console.log($scope.$resolve)
    $scope.item = $scope.$resolve.item;
    $scope.DsDT = $scope.$resolve.item.DsDT;
    $scope.type = $scope.$resolve.type;
    // $scope.ArrayTT = []
    $scope.search = {
        searchkey: '',
        dvc: '0'
    }
    $scope.SelectItem = function () {
        angular.forEach($scope.item.ArrayDTTapThe, function (value, key) {
            value.check = false
        });
        $scope.cancelModal()
    }
    $scope.LoadArrayTT = function () {
        if ($scope.item.FCode != undefined)
            $http({
                method: 'GET',
                url: 'api/TTDoiTuongKT/GetArrayTT',
                params: {
                    SoQD: $scope.item.SoQD,
                    TTKT: $scope.item.FCode
                }
            }).then(function successCallback(response) {
                // if (response.data.length != 0 )
                $scope.item.ArrayTT = response.data
            }, function errorCallback(response) {
                toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
            });
        else {
            $scope.item.ArrayTT = []
            $scope.item.ArrayDTTapThe = []
        }

    }
    $scope.CheckItemTT = function (tt) {
        ////debugger
        if ($scope.ArrayTT.includes(tt.FCode)) {
            tt.check = true;
        };

    }

    $scope.Check = function (tt) {
        if (tt.check) {
            if ($rootScope.DsDT != null) {
                var check = $rootScope.DsDT.filter(t => t == tt.FCode);
                if (check != null && check.length > 0) {
                    toastr.warning('Đối tượng này đã có trong thông tin khen thưởng khác!', 'Thông báo');
                    tt.check = false;
                    return;
                } else {
                    if ($rootScope.DsDT == null) $rootScope.DsDT = [];
                    $rootScope.DsDT.push(tt.FCode);
                }
            }
            else {
                if ($rootScope.DsDT == null) $rootScope.DsDT = [];
                $rootScope.DsDT.push(tt.FCode);
            }
            if ($scope.item.ArrayTT == null) $scope.item.ArrayTT = []
            $scope.item.ArrayTT.push(tt.FCode)
            if ($scope.item.ArrayDTTapThe == null) $scope.item.ArrayDTTapThe = []
            $scope.item.ArrayDTTapThe.push(tt)
        }
        else {
            if ($rootScope.DsDT != null) {
                var isExist = $rootScope.DsDT.indexOf(tt.FCode);
                if (isExist > -1)
                    $rootScope.DsDT.splice(isExist, 1);
            }
            //$scope.item.ArrayTT.splice(tt.index, 1)
            //$scope.item.ArrayDTTapThe.splice(tt.index, 1)

            for (var i = $scope.item.ArrayDTTapThe.length; i--;) {
                if ($scope.item.ArrayDTTapThe[i].FCode === tt.FCode) {
                    $scope.item.ArrayDTTapThe.splice(i, 1);
                    $scope.item.ArrayTT.splice(i, 1);
                }
            }
        }
    }
    $scope.CheckAll = function (item) {
        if (item.check) {

            angular.forEach(item, function (value, key) {
                if ($scope.item.ArrayTT.includes(value.FCode) == false && $rootScope.DsDT.filter(t => t == value.FCode).length == 0) {
                    $scope.item.ArrayTT.push(value.FCode)
                    value.check = true;
                    $scope.item.ArrayDTTapThe.push(value)
                }
            });
        } else {
            angular.forEach(item, function (value, key) {
                $scope.item.ArrayTT.splice(value.index, 1)
                value.check = false;
                $scope.item.ArrayDTTapThe.splice(value.index, 1)
                if ($rootScope.DsDT.indexOf(value.FCode) > -1)
                    $rootScope.DsDT.splice($rootScope.DsDT.indexOf(value.FCode), 1);
            });
        }
    }

    // $scope.LoadArrayTT();
    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.LoadTapThe = function () {

        //$scope.LoadArrayTT();
        // $scope.index = 1;
        // $scope.index = $scope.index + $scope.pageSize * ($scope.Paging.currentPage - 1);
        $http({
            method: 'GET',
            url: 'api/TapTheGet',
            params: {
                searchkey: $scope.search.searchkey,
                pageSize: $scope.pageSize,
                pageNumber: $scope.Paging.currentPage,
                dvc: $scope.search.dvc
            }
        }).then(function successCallback(response) {
            $scope.TapThe = response.data.skt;
            if ($scope.item.ArrayTT == null || $scope.item.ArrayTT == undefined) $scope.item.ArrayTT = []
            angular.forEach($scope.TapThe, function (value, key) {
                if ($scope.item.ArrayTT.includes(value.FCode)) {
                    value.check = true;
                };
            });
            //  $scope.index = $scope.index + $scope.pageSize * (1 - 1);
            $scope.TotalPage = response.data.TotalPage;
            $scope.Paging.pageStart = response.data.pageStart;

            $('#PagingTapThe').bootpag({
                total: $scope.TotalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $scope.LoadTapThe();
                if (num == null) num = 1
                // $scope.index = $scope.index + $scope.pageSize * (num - 1);
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });


    }
    $rootScope.$on("LoadTapThe", function () {
        $scope.LoadTapThe();
    });

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.GettenDvc = function (a) {
        if ($scope.dvcha != null) {
            var obj = $scope.dvcha.filter(t => t.FCode == a);
            if (obj != null && obj.length > 0)
                return obj[0].TenDV;
            else return '';
        } else return '';

    }
    $scope.getdvc = function (a) {
        $http({

            method: 'GET',
            url: 'api/TapThe/GetParent',
            params: {
                crdv: a
            }
        }).then(function successCallback(response) {
            $scope.dvcha = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });


    }
    $scope.DelTT = function (a) {
        if (confirm('Bạn có chắc chắn xóa bản ghi này ko ?')) {
            $http({

                method: 'POST',
                url: 'api/CaNhan/Del',
                data: a
            }).then(function successCallback(response) {
                // $scope.LoadSoKt();
                if (response.data != 'Failed') {
                    toastr.success('Đã xóa dữ liệu thành công !', 'Thông báo');
                    $scope.LoadTapThe();

                    $scope.getdvc('');
                } else {
                    toastr.error('Không được phép xóa Đơn vị/Tập thể này vì đã thuộc Quyết định khen thưởng khác !', 'Thông báo');
                }

            }, function errorCallback(response) {
                toastr.warning('Có lỗi trong quá trình xóa dữ liệu!', 'Thông báo');
            });

        }



    }
    $scope.OnLoad = function () {
        //   $scope.LoadArrayTT();
        // $scope.LoadTapThe();
        $scope.pageSize = $scope.displayPage[0].value;
        //ComponentsSelect2.init();
        //  //debugger
        $scope.getdvc('');
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            format: 'dd/mm/yyyy',
            orientation: "left",
            autoclose: true,
            minDate: 0
        });
    }

});
angular.module('WebApiApp').controller("ModalViewCNController", function ($rootScope, $scope, $http, $uibModalInstance, $q) {
    $scope.checkk = $scope.$resolve.check;
    // if($scope.checkk==null|| typeof $scope.checkk=='undefined')
    //      $scope.checkk='';
    $scope.item = $scope.$resolve.item;
    $scope.item1 = $scope.$resolve.item1;
    if ($scope.item1 == null || typeof $scope.item1 == 'undefined') $scope.item1 = ''
    //  if($scope.item1=='OK'|| typeof $scope.item1=='undefined') $scope.item1=''
    $scope.LoadTTCT = function () {
        $http({
            method: 'GET',
            url: 'api/CaNhan/GetTTKTCT',
            params: {
                type: 'CN',
                FCodeQd: $scope.checkk,
                FCodeDt: $scope.item,
                ttkt: $scope.item1
            }
        }).then(function successCallback(response) {


            $scope.ds = response.data;
            $scope.check = $scope.ds[0];

            console.log($scope.checkk);
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    if ($scope.checkk != 'OK')
        $scope.LoadTTCT();
    else
        $scope.check = $scope.item;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


});
angular.module('WebApiApp').controller("ModalViewTTController", function ($rootScope, $scope, $http, $uibModalInstance, $q) {
    $scope.checkk = $scope.$resolve.check;
    // if($scope.checkk==null|| typeof $scope.checkk=='undefined')
    //      $scope.checkk='';
    $scope.item1 = $scope.$resolve.item1;
    if ($scope.item1 == null || typeof $scope.item1 == 'undefined') $scope.item1 = ''
    $scope.item = $scope.$resolve.item;
    $scope.LoadTTCT = function () {
        $http({
            method: 'GET',
            url: 'api/CaNhan/GetTTKTCT',
            params: {
                type: 'TT',
                FCodeQd: $scope.checkk,
                FCodeDt: $scope.item,
                ttkt: $scope.item1
            }
        }).then(function successCallback(response) {


            $scope.ds = response.data;
            $scope.check = $scope.ds[0];

            console.log($scope.checkk);
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    if ($scope.checkk != 'OK')
        $scope.LoadTTCT();
    else
        $scope.check = $scope.item;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }

});
angular.module('WebApiApp').controller("ModalEditTTController", function ($rootScope, $scope, $http, $uibModalInstance, $q, dataShare) {
    $scope.item = $scope.$resolve.item;
    //new
    $scope.check = $scope.$resolve.check;
    //end new

    $scope.SaveDTKTTT = function (item) {
        if ($scope.check.ArrayTT == null) $scope.check.ArrayTT = [];
        if ($scope.check.ArrayDTTapThe == null) $scope.check.ArrayDTTapThe = [];
        $scope.check.ArrayTT.push(item.FCode)
        $scope.check.ArrayDTTapThe.push(item)
        $rootScope.DsDT.push(item.FCode)
    }
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.SaveAndNew = function () {
        if (typeof $scope.item == 'undefined') {
            toastr.error('Chưa cập nhật số liệu !', 'Thông báo');
            return;
        }
        if ($scope.item.DVCha == '0') $scope.item.DVCha = null;
        ////console.log($scope.item);
        $http({

            method: 'POST',
            url: 'api/TapThe',
            data: $scope.item
        }).then(function successCallback(response) {
            try {
                $scope.SaveDTKTTT(response.data)
            } catch{ }
            //new
            if ($scope.check == '1') dataShare.saveTT($scope.item.TenDV);


            // end new
            $rootScope.$emit("LoadAllTT", {});
            $rootScope.$emit("LoadTapThe", {});
            try { $rootScope.LoadTreeTapThe(); } catch{ }
            //   $rootScope.LoadTapThe();
            $scope.getdvc('');
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            $scope.item = {};
            $scope.item.Tinh = '35';
            $scope.item.DVCha = '0'
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            $scope.LoadError($scope.itemError.ModelState);
        });
        //   }

    }
    $scope.SaveModal = function () {

        if (typeof $scope.item == 'undefined') {
            toastr.error('Chưa cập nhật số liệu !', 'Thông báo');
            return;
        }
        if ($scope.item.DVCha == '0') $scope.item.DVCha = null;
        $http({

            method: 'POST',
            url: 'api/TapThe',
            data: $scope.item
        }).then(function successCallback(response) {
            //new
            debugger
            try {
                $scope.SaveDTKTTT(response.data)
            } catch{ }
            if ($scope.check == '1') {
                dataShare.saveTT($scope.item.TenDV);
                //    console.log($scope.item.TenDV);
            }


            // else getTT.saveTT('');
            $rootScope.$emit("LoadAllTT", {});
            $rootScope.$emit("LoadTapThe", {});
            try { $rootScope.LoadTreeTapThe(); } catch{ }

            // $rootScope.LoadTapThe();
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            $scope.cancelModal();

        }, function errorCallback(response) {
            $scope.itemError = response.data;
            $scope.LoadError($scope.itemError.ModelState);
        });
    }
    $scope.getdvc = function (a) {
        $http({
            method: 'GET',
            url: 'api/TapThe/GetParent',
            params: {
                crdv: a
            }
        }).then(function successCallback(response) {
            $scope.dvcha = response.data
            ////console.log($scope.dvcha);
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.OnLoad = function () {
        //ComponentsSelect2.init();
        if ($scope.item == null || $scope.item == '') {
            $scope.item = {};
            $scope.item.Tinh = '35'
            $scope.bien1 = '';
            $scope.bien2 = '';
            $scope.LoadProvin("0", "0", "0");
            $scope.LoadProvin($scope.item.Tinh, "0", "0");
            $scope.getdvc('');
            $scope.item.DVCha = '0'
        } else {
            $scope.LoadProvin($scope.item.Tinh, $scope.item.Huyen, $scope.item.Xa);

            $scope.getdvc($scope.item.FCode);
        }
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            format: 'dd/mm/yyyy',
            orientation: "left",
            autoclose: true,
            minDate: 0
        });
    }



});
angular.module('WebApiApp').controller("ModalEditCNController", function ($rootScope, $uibModal, $scope, $http, $uibModalInstance, $q, dataShare) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;
    $scope.check = $scope.$resolve.check;

    //new
    $scope.openEditPositionModal = function (item, type, check) {
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/EditPosition.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelPositionHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            size: 'lg',
            resolve: {
                item: function () { return item },
                type: function () { return type },
                check: function () { return check }
            }
        });
    }
    //end new
    $scope.LoadNew = function () {
        $scope.item = {};
        $scope.item.GioiTinh = 'NAM';
        $scope.item.DonVi = "0";
        $scope.item.ChucVu = "0";
        $('#my_select2').val($scope.item.DonVi).trigger('change.select2');
        $('#my_select3').val($scope.item.ChucVu).trigger('change.select2');
        console.log($scope.item.DonVi)
    }
    if ($scope.item == null) {
        $scope.LoadNew();
    }
    $scope.SaveDTKTCN = function (item) {
        if ($scope.check.ArrayCN == null) $scope.check.ArrayCN = [];
        if ($scope.check.ArrayDTCaNhan == null) $scope.check.ArrayDTCaNhan = [];
        $scope.check.ArrayCN.push(item.FCode)
        $scope.check.ArrayDTCaNhan.push(item)
        $rootScope.DsDT.push(item.FCode)
    }
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $rootScope.$on("LoadAllTT", function () {
        $scope.GetAllDonVi();

    })
    $rootScope.$on("GetAllChucVu", function () {
        $scope.GetAllChucVu();

    })
    $scope.SaveAndNew = function () {
        if ($scope.item == null) {
            toastr.error('Chưa cập nhật số liệu !', 'Thông báo');
            return;
        }
        if ($scope.item.DonVi == "0") {
            $scope.item.DonVi = null;
        }
        if ($scope.item.ChucVu == "0") {
            $scope.item.ChucVu = null;
        }
        $http({
            method: 'POST',
            url: 'api/CaNhan',
            data: $scope.item
        }).then(function successCallback(response) {
            try {

                $scope.SaveDTKTCN(response.data)
            } catch{ }
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');

            //new
            $rootScope.$emit("LoadCVDS", {});
            //end new
            $rootScope.$emit("LoadCaNhan", {});
            $scope.LoadNew();
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            $scope.LoadError($scope.itemError.ModelState);
        });
    }
    $scope.SaveModal = function () {
        if ($scope.item == null) {
            toastr.error('Chưa cập nhật số liệu !', 'Thông báo');
            return;
        }
        if ($scope.item.DonVi == "0") {
            $scope.item.DonVi = null;
        }
        if ($scope.item.ChucVu == "0") {
            $scope.item.ChucVu = null;
        }
        $http({
            method: 'POST',
            url: 'api/CaNhan',
            data: $scope.item
        }).then(function successCallback(response) {
            try {

                $scope.SaveDTKTCN(response.data)
            } catch{ }
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //new
            $rootScope.$emit("LoadCVDS", {});
            //end new
            $rootScope.$emit("LoadCaNhan", {});
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            $scope.LoadError($scope.itemError.ModelState);
        });
    }

    $scope.GetAllChucVu = function () {

        $http({
            method: 'GET',
            url: 'api/CaNhan/GetChucVu',
        }).then(function successCallback(response) {
            $scope.cvu = response.data;
            // New
            if ($scope.cvu != null) {
                var obj = $scope.cvu.filter(t => t.FName == dataShare.getCV());
                try {
                    if (obj != null) $scope.item.ChucVu = obj[0].FCode

                    else
                        $scope.item.ChucVu = "0";
                    console.log($scope.item.ChucVu);
                }
                catch (e) { }
            }
            // end new
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $scope.GetAllDonVi = function () {
        $http({
            method: 'GET',
            url: 'api/CaNhan/GetDvi',
        }).then(function successCallback(response) {
            $scope.dvi = response.data;

            // New
            if ($scope.dvi != null) {
                var obj = $scope.dvi.filter(t => t.TenDV == dataShare.getTT());
                try {
                    if (obj != null) $scope.item.DonVi = obj[0].FCode
                    else $scope.item.DonVi = "0";
                    console.log($scope.item.DonVi);
                }
                catch (e) { }
            }
            // end new
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.OnLoad = function () {
        //ComponentsSelect2.init();
        $scope.GetAllChucVu();
        $scope.GetAllDonVi();
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            format: 'dd/mm/yyyy',
            orientation: "left",
            autoclose: true,
            minDate: 0
        });
    }

});

angular.module('WebApiApp').controller("ModalDetailKTKLController", function ($rootScope, $uibModal, $scope, $http, $uibModalInstance, $q) {

    $scope.item = $scope.$resolve.item;

    $scope.LoadDSbyFCode = function () {
        $scope.ColArr = [];
        $http({
            method: 'GET',
            url: 'api/ListTDKT/GetTDKTbyFCode',
            params: { FCode: $scope.item.DSKhenThuong }
        }).then(function successCallback(response) {

            $scope.itemDS = response.data;

            $scope.ColArr = JSON.parse(response.data[0].InforCol)
            //console.log($scope.ColArr)
        }, function errorCallback(response) {

        });
    }
    $scope.LoadDanhSach = function () {
        $http({
            method: 'GET',
            url: 'api/KTKL/LoadAllDSKT'
        }).then(function successCallback(response) {
            $scope.DanhSach = response.data;
            angular.forEach($scope.DanhSach, function (value) {
                if ($scope.item.DSKhenThuong == value.FCode) {
                    $scope.item.TenDS = value.FName;
                }
            });
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.OnLoad = function () {
        App.initAjax();
        //ComponentsSelect2.init();
        $scope.LoadDanhSach();
        $scope.LoadDSbyFCode();
    }
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


});

// New
angular.module('WebApiApp').factory('dataShare', function ($rootScope) {
    var service = {};

    service.saveCV = function (data) {
        this.data = data;
    };
    service.getCV = function () {
        return this.data;
    };
    service.saveTT = function (data) {
        this.TT = data;
    };
    service.getTT = function () {
        return this.TT;
    };
    return service;
});
//end new
angular.module('WebApiApp').controller('ModalDHController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$uibModalInstance', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.check = $scope.$resolve.check;
    console.log($scope.item);
    console.log($scope.check);
    if ($scope.item == 'DH') { $scope.TieuDe = 'Danh hiệu'; $scope.typedt = 'CN' };
    if ($scope.item == 'TT') { $scope.TieuDe = 'Thành tích'; $scope.typedt = 'CN' };
    if ($scope.item == 'DHTT') { $scope.TieuDe = 'Danh hiệu'; $scope.typedt = 'TT'; $scope.item = 'DH' };
    if ($scope.item == 'TTTT') { $scope.TieuDe = 'Thành tích'; $scope.typedt = 'TT'; $scope.item = 'TT' };
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.GetAllDHTT = function () {
        $http({
            method: 'GET',
            url: 'api/CaNhan/GetDHTT',
            params: {
                type: $scope.item,
                FCode: $scope.check,
                type1: $scope.typedt
            }
        }).then(function successCallback(response) {
            $scope.DHTT = response.data;
            console.log($scope.DHTT);
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
}]);

// ImportExcel
angular.module('WebApiApp').controller('ImportExcelController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$uibModalInstance', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings, $uibModalInstance) {
    $scope.ColArr = $scope.$resolve.item.StyleTable;
    $scope.Save = function (item) {
 
        if (item.HoTen == null) {
            toastr.warning('Vui lòng nhập đầy đủ Họ và tên trước khi lưu !', 'Thông báo');
            return;
        }
     

        $http({
            method: 'POST',
            url: 'api/KTKL/SaveKTKL',
            data: item
        }).then(function successCallback(response) {
            if (response.data == '-2') {
                toastr.warning('Vui lòng nhập đầy đủ dữ liệu trước khi lưu  !', 'Thông báo');
            }

        }, function errorCallback(response) {

            toastr.error('Không lưu được dữ liệu !', 'Thông báo');
        });


    }
   
    $scope.SaveKTKL = function () {
        angular.forEach($scope.KTKL, function (value, key) {
            
            if (key > 1) {
                value.SoKhenThuong = $scope.$resolve.item.So
                value.DSKhenThuong = $scope.$resolve.item.Ds
                value.Id = parseInt(value.Id)
                value.FInUse = true
                value.FBranchCode = $cookies.get('FCodeDV')
                $scope.Save(value)
            }
        });
        toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
        $rootScope.Load();
        $scope.cancelModal();
    }
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.READ = function () {
        /*Checks whether the file is a valid excel file*/
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;
        var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/
        if ($("#ngexcelfile").val().toLowerCase().indexOf(".xlsx") > 0) {
            xlsxflag = true;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;

            if (xlsxflag) {
                var workbook = XLSX.read(data, { type: 'binary' });
            }
            else {
                var workbook = XLS.read(data, { type: 'binary' });
            }

            var sheet_name_list = workbook.SheetNames;
            var cnt = 0;
            sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/

                if (xlsxflag) {
                    var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                }
                else {
                    var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
                }
                if (exceljson.length > 0) {

                    //$scope.item = exceljson[exceljson.length - 1]
                    //$scope.item.IDTruong = $rootScope.CurDonVi.Id
                    //$scope.item.IDNamHoc = $rootScope.CurNamHoc.Id
                    //$scope.item.KyHoc = $rootScope.CurKyHoc
                    //$scope.item.TrangThai = 'DST'
                    //$scope.item.Id = $scope.tempId
                    //$scope.$apply();
                    console.log(exceljson);
                    $scope.KTKL = exceljson
                    //$scope.KTKL = $scope.KTKL.splice(0,2)
                    $scope.$apply();
                }

            });
        }
        if ($("#ngexcelfile")[0].files[0] == null || $("#ngexcelfile")[0].files[0] == undefined) {
            toastr.warning('Bạn chưa chọn tệp !', 'Thông báo');
            return;
        }
        if (xlsxflag) {
            reader.readAsArrayBuffer($("#ngexcelfile")[0].files[0]);
            $scope.saveShow = true
        }
        else {
            reader.readAsBinaryString($("#ngexcelfile")[0].files[0]);
            $scope.saveShow = true
        }

    };
}]);