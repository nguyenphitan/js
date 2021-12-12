angular.module('WebApiApp').controller("ModelUserHandlerController", function ($filter, $scope, $http, $uibModalInstance) {
    $scope.itemUser = $scope.$resolve.itemUser;
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
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.OnLoad = function () {
        ComponentsSelect2.init();
        if (jQuery().datepicker) {
            $('.date-picker').datepicker({
                rtl: App.isRTL(),
                format: 'dd/mm/yyyy',
                orientation: "left",
                autoclose: true
            });
            //$('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
        }
    }
    $scope.SaveModal = function () {
        if (typeof $scope.itemUser == 'undefined') {
            $scope.itemUser = {};
        }
        $scope.itemUser.FBranchCode = $scope.CoCode;
        $scope.itemUser.Department = $scope.itemDepartment;
        $scope.itemUser.DonVi = $scope.itemDV;
        if (typeof $scope.itemUser.Id == 'undefined' || $scope.itemUser.Id == null || $scope.itemUser.Id == '') {
            $scope.itemRegUser = {
                "UserName": $scope.itemUser.UserName,
                "Email": $scope.itemUser.Email,
                "PhoneNumber": $scope.itemUser.Mobile,
                //"Password": "",
                // "ConfirmPassword": "",
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
                    $http({
                        method: 'POST',
                        url: '/Group/SaveGroupByUser',
                        params: { user: $scope.itemUser.UserName, CodeGroup: $scope.itemGroup},
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
    $scope.ProvinChange = function (ProvinId, DistrictId, WardId) {

        $scope.LoadProvin(ProvinId, DistrictId, WardId);
    }
    $scope.ProvinChange($scope.itemUser.Provin, $scope.itemUser.District, $scope.itemUser.Ward);
    $scope.ChageUser = function (MaUser) {
        $http({
            method: 'GET',
            url: '/api/UserProfiles/GetUserbyUserName/' + MaUser
        }).then(function successCallback(response) {
            $scope.itemUser = response.data;
            // console.log(response.data.Department);
            if (typeof response.data.Department != 'undefined' && response.data.Department != '' && response.data.Department != null)
                $scope.itemDepartment = response.data.Department;
            if (typeof response.data != 'undefined') $scope.ProvinChange($scope.itemUser.Provin, $scope.itemUser.District, $scope.itemUser.Ward);
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
    //$scope.LoadUser($scope.itemDepartment);
    //TreeTextDV
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
            //console.log($scope.itemDV );
            // 
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.itemUser.Birthday = $filter('date')($scope.itemUser.Birthday, 'dd/MM/yyyy');

    $scope.GetGioiTinh();
    $scope.FillListBox();
    $scope.LoadGroups();
    if ($scope.itemUser.Id != '') {
        $scope.read = true;
    }
    else {
        $scope.itemUser = {};
        $scope.read = false;
    }
});
/* Setup blank page controller */
angular.module('WebApiApp').controller('UserController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {
    $scope.cancelModal = function () {
        $uibModal.dismiss('close');
    }
    $scope.DeleteUser = function (Id) {
        if (confirm('Bạn có chắc chắn xóa bản ghi này ko ?')) {
            $http({
                method: 'DELETE',
                url: '/api/Users/' + Id
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available     

                toastr.warning('Đã xóa dữ liệu thành công !', 'Thông báo');
                $scope.LoadUsers();
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
    $scope.CompanyChange = function () {

        $scope.LoadTreeOrg();
        //$scope.LoadTreeTextOrg();
        //$scope.LoadDeparment($scope.CoCode,'ALL');
    };
    $scope.LoadTreeOrg = function () {
        if ($scope.CoCode == "")
            return;
        $http({
            method: 'GET',
            url: '/Org/Tree/' + $scope.CoCode
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.OrgTreeValue = response.data;

            $("#tree_3").jstree({
                "core": {
                    "themes": {
                        "responsive": false
                    },
                    "check_callback": true,
                    'data': $scope.OrgTree,
                },
                "types": {
                    "default": {
                        "icon": "fa fa-folder icon-state-warning icon-lg"
                    },
                    "file": {
                        "icon": "fa fa-file icon-state-warning icon-lg"
                    }
                },

                "state": { "key": "demo2" },
                "plugins": ["dnd", "state", "types"]
            });

            $('#tree_3').jstree(true).settings.core.data = $scope.OrgTreeValue;
            $('#tree_3').jstree(true).refresh(true);

            $('#tree_3').on("select_node.jstree", function (e, data) {
                //if (data.node.id != null) {
                //    data.instance.deselect_node(data.node);

                //}
                $http({
                    method: 'GET',
                    url: '/Users/' + data.node.original.code
                }).then(function successCallback(response) {
                    $scope.ListUser = response.data;
                    $scope.itemDV = data.node.original.code;
                }, function errorCallback(response) {
                });
            });
        }, function errorCallback(response) {
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });

    }
    $scope.openEditUser = function (itemUser, type, Code) {
        if (itemUser.Department != null) $scope.itemDepartment == itemUser.Department;
        if (itemUser != '' && itemUser != undefined) $scope.disabled = 'disabled'; else $scope.disabled = '';
        if (itemUser.FBranchCode == null) itemUser.FBranchCode = Code;
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
        $scope.CoCode = $scope.DefaultOrganization;
        $scope.itemDepartment = "";
        $scope.LoadCompanies();
        $scope.LoadTreeOrg();
        $scope.CoCodeDep = "";
        //$scope.LoadDeparment($scope.CoCode,'ALL');
        $scope.LoadProvin("0", "0", "0");
        ComponentsSelect2.init();
        ComponentsDateTimePickers.init();
    });

}]);