angular.module('WebApiApp').controller("ModelUserHandlerController", function ($rootScope,$filter, $scope, $http, $uibModalInstance) {
    $scope.itemUser = $scope.$resolve.itemUser;
    $scope.ProvinChange = function (ProvinId, DistrictId, WardId) {

        $scope.LoadProvin(ProvinId, DistrictId, WardId);
    }

    if ($scope.itemUser == undefined || $scope.itemUser == '') {
        $scope.itemUser = {
            Provin: $scope.DefaultArea,
            Gender: "NAM",
        };
        $scope.itemGroup = [];
    }
    else {

        $scope.itemDV = $scope.$resolve.itemUser.DonVi;
        $scope.itemDepartment = $scope.$resolve.itemUser.Department;
        $http({
            method: 'GET',
            url: '/Group/GetGroupByUser',
            params: { user: $scope.itemUser.UserName }
        }).then(function successCallback(response) {
            $scope.itemGroup = JSON.parse(response.data);
        }, function errorCallback(response) {
        });
    }
    $scope.ProvinChange($scope.itemUser.Provin, $scope.itemUser.District, $scope.itemUser.Ward);
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.OnLoad = function () {
        //$(".form_user").select2({
        //    placeholder: 'Chọn',
        //    escapeMarkup: function (m) { return m; },
        //    width: null
        //});
       
        //if (jQuery().datepicker) {
        //    $('.date-picker').datepicker({
        //        rtl: App.isRTL(),
        //        format: 'dd/mm/yyyy',
        //        orientation: "left",
        //        autoclose: true
        //    });

        //}
    }
    $scope.SaveModal = function () {
        if (typeof $scope.itemUser == 'undefined') {
            $scope.itemUser = {};
        }
        $scope.itemUser.FBranchCode = $scope.DefaultOrganization;
        $scope.itemUser.Department = $scope.itemDepartment;
        $scope.itemUser.DonVi = $scope.itemDV;
        if (typeof $scope.itemUser.Id == 'undefined' || $scope.itemUser.Id == null || $scope.itemUser.Id == '') {
            $scope.itemRegUser = {
                "UserName": $scope.itemUser.UserName,
                "Email": $scope.itemUser.Email,
                "PhoneNumber": $scope.itemUser.Mobile,
            };

            $http({
                method: 'POST',
                url: '/api/Account/Register',
                data: $scope.itemRegUser
            }).then(function successCallback(response) {
                $http({
                    method: 'POST',
                    url: '/api/UserProfiles',
                    data: $scope.itemUser
                }).then(function successCallback(response) {
                    $rootScope.LoadUser();
                    $http({
                        method: 'POST',
                        url: '/Group/SaveGroupByUser',
                        params: { user: $scope.itemUser.UserName, CodeGroup: JSON.stringify($scope.itemGroup) },
                    }).then(function successCallback(response) {
                      
                    }, function errorCallback(response) {

                    });
                    toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
                    $uibModalInstance.dismiss('close');
                }, function errorCallback(response) {
                    $scope.itemUserError = response.data
                    $scope.LoadError($scope.itemUserError.ModelState);
                });

            }, function errorCallback(response) {
                $scope.itemUserError = response.data
                $scope.LoadError($scope.itemUserError.ModelState);

            });
        }
        else {
            $http({
                method: 'POST',
                url: '/api/UserProfiles',
                data: $scope.itemUser
            }).then(function successCallback(response) {
                $rootScope.LoadUser();
                $http({
                    method: 'POST',
                    url: '/Group/SaveGroupByUser',
                    params: { user: $scope.itemUser.UserName, CodeGroup: JSON.stringify($scope.itemGroup) },
                }).then(function successCallback(response) {

                }, function errorCallback(response) {

                });
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
                $uibModalInstance.dismiss('close');
            }, function errorCallback(response) {
                $scope.itemUserError = response.data
                $scope.LoadError($scope.itemUserError.ModelState);
            });
        }
        //$scope.LoadUser($scope.itemDepartment);



    }
    $scope.LoadPositions = function () {
        $http({
            method: 'GET',
            url: '/api/LoadPositions'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.Position = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadPositions();
    $scope.ChageUser = function (MaUser) {
        $http({
            method: 'GET',
            url: '/api/UserProfiles/GetUserbyUserName',
            params: { UserName: MaUser }
        }).then(function successCallback(response) {
            debugger
            $scope.itemUser = response.data;
            if (typeof response.data.DonVi != 'undefined' && response.data.DonVi != '' && response.data.DonVi != null) {
                $scope.itemDV = response.data.DonVi;
                ChangeDV();
            }
               
            if (typeof response.data.Department != 'undefined' && response.data.Department != '' && response.data.Department != null)
                $scope.itemDepartment = response.data.Department;
            if (typeof response.data != 'undefined') {
                $scope.LoadProvin("0", "0", "0");
                if ($scope.itemUser.Provin != undefined)
                    $scope.ProvinChange($scope.itemUser.Provin, $scope.itemUser.District, $scope.itemUser.Ward);
                else
                    $scope.itemUser = {
                        UserName: MaUser,
                        Provin: $scope.DefaultArea,
                        Gender: "NAM",
                    };
            }

        }, function errorCallback(response) {
        });
    }
    $scope.LoadUser = function (code) {
        $http({
            method: 'GET',
            url: '/Users/' + code
        }).then(function successCallback(response) {
            $scope.ListUser = response.data;
        }, function errorCallback(response) {
            toastr.error('Có lỗi xẩy ra trong quá trình tải dữ liệu !', 'Lỗi tải dữ liệu');
        });
    }
    $scope.FillListBox = function () {
        //List Kế hoạch dự kiến - thời gian dự kiến thực hiện
        $http({
            method: 'GET',
            url: '/Org/TreeText/' + $scope.DefaultOrganization + '/1'
        }).then(function successCallback(response) {
            $scope.TreeTextDV = response.data;
            // console.log(response.data);
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
        if ($scope.itemDV != '' && $scope.itemDV != undefined) {
            $http({
                method: 'GET',
                url: '/Org/TreeText/' + $scope.itemDV + '/4'
            }).then(function successCallback(response) {
                $scope.TreeTextDeparment = response.data;

            }, function errorCallback(response) {
                toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
            });
        }
    }
    $scope.ChangeDV = function () {
        $http({
            method: 'GET',
            url: '/Org/TreeText/' + $scope.itemDV + '/4'
        }).then(function successCallback(response) {
            $scope.TreeTextDeparment = response.data;
            //console.log($scope.itemDV );
            // 
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.GetGioiTinh = function () {
        $http({
            method: 'GET',
            url: '/api/GetAllGT',
        }).then(function successCallback(response) {
            $scope.GioiTinh = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    //$scope.itemUser.Birthday = $filter('date')($scope.itemUser.Birthday, 'dd/MM/yyyy');

    $scope.GetGioiTinh();
    $scope.FillListBox();
    $scope.LoadGroups();
    $scope.itemGroup = [];

});
/* Setup blank page controller */
angular.module('WebApiApp').controller("ModelPositionHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.itemUser;
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
                $scope.LoadPositions();
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');

                $uibModalInstance.close('save');
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
                toastr.success('Cập nhật dữ liệu thành công!', 'Thông báo');
                $scope.LoadPositions();
                $uibModalInstance.close('save');
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
    if ($scope.item != '') $scope.read = true;
    else {
        $scope.item = {};
        $scope.read = false;
    }

});
angular.module('WebApiApp').controller('UserManagerController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {
    $scope.cancelModal = function () {
        $uibModal.dismiss('close');
    }
    $scope.DeleteUser = function (Id) {
        if (confirm('Bạn có chắc chắn xóa bản ghi này ko ?')) {
            $http({
                method: 'POST',
                url: '/api/UserProfiles/DeleteUser',
                params: { id: Id }
            }).then(function successCallback(response) {

                toastr.warning('Đã xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadUser();
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                toastr.error('Không xóa được dữ liệu !', 'Thông báo');
            });
        }
    };
    $scope.ResetPass = function (user) {
        $http({
            method: 'POST',
            url: '/api/Account/ResetPassword/' + user.Id
        }).then(function successCallback(response) {
            toastr.success('Reset mật khẩu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            toastr.error('Reset mật khẩu không thành công !', 'Thông báo');
        });
    }
    $scope.LoadTreeTextOrg = function () {
        $http({
            method: 'GET',
            url: '/Org/TreeText/' + $scope.DefaultOrganization + '/ALL'
        }).then(function successCallback(response) {
            $scope.TreeTextOrgs = response.data;
            //$scope.TreeTextOrgs.shift();
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.UseChange = function () {
        $rootScope.LoadUser();
    }
    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "pageStart": 0,
        "pageEnd": 0,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.PrePage = function () {
        if ($scope.Paging.currentPage > 1) {
            $scope.Paging.currentPage = $scope.Paging.currentPage - 1;
            $rootScope.LoadUser();
        }

    }
    $scope.NextPage = function () {
        if ($scope.Paging.currentPage < $scope.Paging.totalPage) {
            $scope.Paging.currentPage = $scope.Paging.currentPage + 1;
            if ($scope.Paging.currentPage == $scope.Paging.totalPage) {
                $scope.Paging.currentPage == $scope.Paging.totalPage
            }
            $rootScope.LoadUser();
        }

    }
    $rootScope.LoadUser = function () {
        if ($scope.Paging.currentPage == '') return;
        if ($scope.Paging.currentPage == 0 || $scope.Paging.currentPage > $scope.Paging.totalPage)
            $scope.Paging.currentPage = 1;
        $http({
            method: 'GET',
            url: '/api/UserProfile/GetUsers?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey + '&maDV=' + $scope.itemDepartment,
        }).then(function successCallback(response) {
            $scope.ListUser = response.data.dt;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.pageEnd = response.data.pageEnd;
            $scope.Paging.totalPage = response.data.totalPage;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi xảy ra trong quá trình tải dữ liệu !', 'Lỗi tải dữ liệu');
        });
    }
    $scope.openEditPostion = function (itemUser) {
        //console.log(itemUser);
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/EditPosition.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelPositionHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            size: 'lg',
            index: 10000,
            resolve: {
                itemUser: function () { return itemUser }
            }
        });
    }
    $scope.openEditUser = function (itemUser, type, Code) {
        if (itemUser.DonVi == null) $scope.DonVi == Code;
        if (itemUser != '' && itemUser != undefined) $scope.disabled = 'disabled'; else $scope.disabled = '';
        if (itemUser.FBranchCode == null) itemUser.FBranchCode = $scope.DefaultOrganization;
        var templateUrl = 'views-client/template/Edit' + type + '.html?bust=' + Math.random().toString(36).slice(2);
        var controller = 'Model' + type + 'HandlerController';
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: templateUrl,
            controller: controller,
            controllerAs: 'vm',
            scope: $scope,
            size: 'lg',
            resolve: {
                itemUser: function () { return itemUser }
            }

        });


    }
    $scope.$on('$viewContentLoaded', function () {

        $scope.itemDepartment = $scope.DefaultOrganization;
        $scope.LoadTreeTextOrg();
        $rootScope.LoadUser();
        $scope.LoadProvin("0", "0", "0");
        ComponentsSelect2.init();
        ComponentsDateTimePickers.init();
    });

}]);