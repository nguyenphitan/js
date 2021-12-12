﻿angular.module('WebApiApp').controller("ModelRolesGroupController", function ($scope, $http, $uibModalInstance) {
    $scope.itemGroup = $scope.$resolve.itemGroup;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'Group/SaveGroupRoles',
            data: $scope.RolesGroup
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
            // $scope.LoadGroups();
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.error('Cập nhật dữ liệu không thành công !', 'Lỗi dữ liệu');
        });

        $uibModalInstance.close('save');
    }

});
angular.module('WebApiApp').controller("ModelUserGroupController", function ($scope, $http, $uibModalInstance, $timeout) {
    $scope.itemGroup = $scope.$resolve.itemGroup;
    $scope.OnLoad = function () {
        App.initAjax();
        function format(state) {
            if (!state.id) return state.text; // optgroup
            return state.text;
        }
        var placeholder = "Chọn";

        $(".select2, .select2-multiple").select2({
            placeholder: placeholder,
            formatResult: format,
            formatSelection: format,
            escapeMarkup: function (m) { return m; },
            width: null,
            allowClear: true,
        });


    }
    $scope.LoadUserByGroup = function (code) {
        $http({
            method: 'GET',
            url: '/api/UserProfiles/GetUserbyGroup?codeGroup=' + code,
        }).then(function successCallback(response) {
            $scope.itemUsersGroup = response.data;
            $scope.UseChange();
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }

    $scope.addUserToGroup = function (item) {
        var check = $scope.itemUsersGroup.filter(x => x.Id === item.us.Id);
        if (item.check == true) {
            if (check.length == 0) {
                $scope.itemUsersGroup.push(item.us);
            }
        }
        else {
            for (var i = 0; i < $scope.itemUsersGroup.length; i++) {
                if ($scope.itemUsersGroup[i].Id == item.us.Id) {
                    $scope.itemUsersGroup.splice(i, 1);
                }
            }
            item.check == false;
        }

    }
    $scope.RemoveUserToGroup = function (item) {
        for (var i = 0; i < $scope.itemUsersGroup.length; i++) {
            if ($scope.itemUsersGroup[i].Id == item.Id) {
                $scope.itemUsersGroup.splice(i, 1);

            }
        }
        $scope.LoadUser($scope.itemUsersGroup);

    }
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'Group/SaveGroupUser?codeGroup=' + $scope.itemGroup.FCode,
            data: $scope.itemUsersGroup,
        }).then(function successCallback(response) {

            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');

        }, function errorCallback(response) {

            toastr.error('Cập nhật dữ liệu không thành công !', 'Lỗi dữ liệu');
        });

    }
    
    $scope.UseChange = function () {
        $scope.LoadUser($scope.itemUsersGroup);
    }
    $scope.LoadUser = function (list) {
        if ($scope.Paging.currentPage == '') return;
        if ($scope.Paging.currentPage == 0 || $scope.Paging.currentPage > $scope.Paging.totalPage)
            $scope.Paging.currentPage = 1;
        $http({
            method: 'POST',
            url: '/Users?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&code=' + $scope.itemDepartment + '&searchKey=' + $scope.Paging.searchKey + '&type=PB',
            data: list
        }).then(function successCallback(response) {
            $scope.ListUser = response.data.list;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.pageEnd = response.data.pageEnd;
            $scope.Paging.totalPage = response.data.totalPage;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi xảy ra trong quá trình tải dữ liệu !', 'Lỗi tải dữ liệu');
        });

    }
    $scope.Paging = {
        "searchKey": '',
        "pageSize": 5000,
        "pageStart": 0,
        "pageEnd": 0,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.PrePage = function () {
        if ($scope.Paging.currentPage > 1) {
            $scope.Paging.currentPage = $scope.Paging.currentPage - 1;
            $scope.LoadUser($scope.itemUsersGroup);
        }

    }
    $scope.NextPage = function () {
        if ($scope.Paging.currentPage < $scope.Paging.totalPage) {
            $scope.Paging.currentPage = $scope.Paging.currentPage + 1;
            if ($scope.Paging.currentPage == $scope.Paging.totalPage) {
                $scope.Paging.currentPage == $scope.Paging.totalPage
            }
            $scope.LoadUser($scope.itemUsersGroup);
        }

    }
    $scope.CoCode = "";
    $scope.itemDepartment = $scope.DefaultOrganization;
    $scope.LoadUserByGroup($scope.itemGroup.FCode)
    
    //$scope.LoadCompanies();
    //$scope.LoadTreeTextOrg();
    //$scope.LoadTreeOrg();
   // $scope.LoadDeparment($scope.CoCode,'ALL');
    $scope.ListUser = [];

});
angular.module('WebApiApp').controller("ModelGroupHandlerController", function ($scope, $http, $uibModalInstance) {
    $scope.itemGroup = $scope.$resolve.itemUser;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.SaveModal = function () {

        if (typeof $scope.itemGroup == 'undefined') {
            toastr.error('Chưa cập nhật số liệu !', 'Thông báo');
            return;
        }
        if (typeof $scope.itemGroup.Id == 'undefined' || $scope.itemGroup.Id == 0) {
            $http({
                method: 'POST',
                url: '/api/Groups',
                data: $scope.itemGroup
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
                $scope.LoadGroups();
                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemRoleError = response.data;
                $scope.LoadError($scope.itemRoleError.ModelState);
            });
        }
        else {
            $http({
                method: 'PUT',
                url: '/api/Groups/' + $scope.itemGroup.Id,
                data: $scope.itemGroup
            }).then(function successCallback(response) {
                //console.log(response);
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công Id = ' + $scope.itemGroup.Id + ' !', 'Thông báo');
                $scope.LoadGroups();
                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemRoleError = response.data;
                $scope.LoadError($scope.itemRoleError.ModelState);
            });
        }

    }
    $scope.ValidOnlyCode = function (FCode) {
        if (typeof $scope.itemGroup == 'undefined') {
            $scope.itemGroup = {};

        }
        $http({
            method: 'GET',
            url: '/api/CheckValidGroup/' + FCode,
        }).then(function successCallback(response) {

            if (response.data != 'undefined') {
                $scope.itemGroup = response.data;
                toastr.warning('Mã này đã tồn tại !', 'Thông báo');
            }
            else {

                $scope.itemGroup.Id = 0;
                $scope.itemGroup.FName = null;
                $scope.itemGroup.FDescription = null;
                toastr.success('Có thể sử dụng mã này !', 'Thông báo');
            }
        }, function errorCallback(response) {
        });
    }
    if ($scope.itemGroup != '') $scope.read = true;
    else $scope.read = false;
});
/* Setup blank page controller */
angular.module('WebApiApp').controller('GroupController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {
    $scope.LoadRolesbyGroup = function (code) {
        $http({
            method: 'GET',
            url: '/Group/RolesGroup/' + code
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.RolesGroup = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }

    $scope.openUserGroupModal = function (itemGroup) {

        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/UserGroup.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelUserGroupController',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            resolve: {
                itemGroup: function () { return itemGroup }
            }
        });
    }
    $scope.openRolesGroupModal = function (itemGroup) {
        $scope.LoadRolesbyGroup(itemGroup.FCode)
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/RolesGroup.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelRolesGroupController',
            controllerAs: 'vm',
            scope: $scope,
            size: 'md',
            resolve: {
                itemGroup: function () { return itemGroup }
            }
        });
    }
    $scope.cancelModal = function () {
        $uibModal.dismiss('close');
    }

    $scope.DeleteGroup = function (Id) {
        if (confirm('Bạn có chắc chắn xóa bản ghi này ko ?')) {
            $http({
                method: 'DELETE',
                url: '/api/Groups/' + Id
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available     

                toastr.warning('Đã xóa dữ liệu thành công !', 'Thông báo');
                $scope.LoadGroups();
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                toastr.error('Không xóa được dữ liệu !', 'Thông báo');
            });
        }
    };
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
    $scope.$on('$viewContentLoaded', function () {
        $scope.itemCompany = "ALL";
        // initialize core components
        //App.initAjax();
        //// set default layout mode
        //$rootScope.$settings.layout.pageContentWhite = true;
        //$rootScope.$settings.layout.pageBodySolid = false;
        //$rootScope.$settings.layout.pageSidebarClosed = true;
        // Simple GET request example:
        $scope.LoadTreeTextOrg();
        $scope.LoadGroups();

    });

}]);