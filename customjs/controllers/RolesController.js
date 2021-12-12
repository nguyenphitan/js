angular.module('WebApiApp').controller("ModelRolesHandlerController", function ($scope, $http, $uibModalInstance, $rootScope) {
    $scope.itemRoles = $scope.$resolve.itemUser;
    $scope.OnLoad = function () {
        App.initAjax();
        ComponentsSelect2.init();
    }
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.SaveModal = function () {

        if (typeof $scope.itemRoles == 'undefined') {
            $scope.itemRoles = {};
            toastr.error('Chưa cập nhật số liệu !', 'Thông báo');
            return;
        }
        if (typeof $scope.itemRoles.Id == 'undefined' || $scope.itemRoles.Id == 0) {
            $http({
                method: 'POST',
                url: '/api/Roles',
                data: $scope.itemRoles
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadRoles();
                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemRoleError = response.data;
                $scope.LoadError($scope.itemRoleError.ModelState);
            });
        }
        else {
            $http({
                method: 'PUT',
                url: '/api/Roles/' + $scope.itemRoles.Id,
                data: $scope.itemRoles
            }).then(function successCallback(response) {
                console.log(response);
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công Id = ' + $scope.itemRoles.Id + ' !', 'Thông báo');
                $rootScope.LoadRoles();
                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemRoleError = response.data;
                $scope.LoadError($scope.itemRoleError.ModelState);
            });
        }

    }
    $scope.ValidOnlyCode = function (FCode) {
        if (typeof $scope.itemRoles == 'undefined') {
            $scope.itemRoles = {};

        }
        $http({
            method: 'GET',
            url: '/api/CheckValidRole/' + FCode,
        }).then(function successCallback(response) {

            if (response.data != 'undefined') {
                $scope.itemRoles = response.data;
                toastr.warning('Mã này đã tồn tại !', 'Thông báo');
            }
            else {

                $scope.itemRoles.Id = 0;
                $scope.itemRoles.FName = null;
                $scope.itemRoles.FDescription = null;
                toastr.success('Có thể sử dụng mã này !', 'Thông báo');
            }
        }, function errorCallback(response) {
        });
    }
    if ($scope.itemRoles != '') $scope.read = true;
    else {
        $scope.itemRoles = {};
        $scope.read = false;
    }
});
angular.module('WebApiApp').controller("ModelRolePermissionHandlerController", function ($scope, $http, $uibModalInstance, $rootScope) {
    $scope.itemRolePermission = $scope.$resolve.itemUser;
    
    $scope.OnLoad = function () {
        App.initAjax();
        ComponentsSelect2.init();
      
    }
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.GetDropRole = function () {
        $http({
            method: 'GET',
            url: '/api/GetDropRole'
        }).then(function successCallback(response) {
            $scope.DropRole = response.data;
           
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetDropMain = function () {
        $http({
            method: 'GET',
            url: '/api/GetDropMainMenu'
        }).then(function successCallback(response) {
            $scope.DropMain = response.data;
            $scope.CoCode = $scope.DropMain[0].FCode;
            $scope.LoadMenuChange($scope.DropMain[0].FCode);
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadMenuChange = function (Code) {
        $http({
            method: 'GET',
            url: '/api/ApiMenus/GetMenusByLevel/' + Code + '/' + $scope.itemRolePermission.FCode
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.MenuRole = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
    $scope.GetMenuName = function (obj) {
        if (obj.FLevel == 2)
            return " |--" + obj.FName;
        return obj.FName;
    }
    //$scope.CheckMenuPermission = {};
    $scope.GetDropRole();
    $scope.GetPermission();
    $scope.GetDropMain();

    $scope.SaveModal = function (list,CodeRole) {
        $http({
            method: 'POST',
            url: 'api/ApiMenus/Menus/SaveRoleAssign/' + CodeRole,
            data:list
        }).then(function successCallback(response) {
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });

    }
   

});
/* Setup blank page controller */
angular.module('WebApiApp').controller('RolesController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.openRolePerModal = function (itemUser) {

        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/EditRolePermission.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelRolePermissionHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            size: 'full',
            backdrop:'static',
            resolve: {
                itemUser: function () { return itemUser }
            }
        });
    }
    $rootScope.LoadRoles = function () {
        $http({
            method: 'GET',
            url: '/api/Roles'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $rootScope.Roles = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.cancelModal = function () {
        $uibModal.dismiss('close');
    }

    $scope.DeleteRoles = function (Id) {
        if (confirm('Bạn có chắc chắn xóa bản ghi này ko ?')) {
            $http({
                method: 'DELETE',
                url: '/api/Roles/' + Id
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available     

                toastr.warning('Đã xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadRoles();
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                toastr.error('Không xóa được dữ liệu !', 'Thông báo');
            });
        }
    };

    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        App.initAjax();
        ComponentsSelect2.init();
        //ComponentsDropdowns.init();
        //// set default layout mode
        //$rootScope.$settings.layout.pageContentWhite = true;
        //$rootScope.$settings.layout.pageBodySolid = false;
        //$rootScope.$settings.layout.pageSidebarClosed = false;
        // Simple GET request example:
        $rootScope.LoadRoles();

    });

}]);