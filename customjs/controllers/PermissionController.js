angular.module('WebApiApp').controller("ModelPermissionHandlerController", function ($scope, $http, $uibModalInstance) {
    $scope.itemPermission = $scope.$resolve.itemPermission;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.SaveModal = function () {

        if (typeof $scope.itemPermission == 'undefined') {
            $scope.itemPermission = {}
            toastr.error('Chưa cập nhật số liệu !', 'Thông báo');
            return;
        }
        if (typeof $scope.itemPermission.Id == 'undefined' || $scope.itemPermission.Id == 0) {
            $http({
                method: 'POST',
                url: '/api/Permissions',
                data: $scope.itemPermission
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
                $scope.LoadPermissions();
                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemPerError = response.data;
                $scope.LoadError($scope.itemPerError.ModelState);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
        else {
            $http({
                method: 'PUT',
                url: '/api/Permissions/' + $scope.itemPermission.Id,
                data: $scope.itemPermission
            }).then(function successCallback(response) {
                console.log(response);
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công Id = ' + $scope.itemPermission.Id + ' !', 'Thông báo');
                $scope.LoadPermissions();
                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemPerError = response.data;
                $scope.LoadError($scope.itemPerError.ModelState);
            });
        }
       
    }
    $scope.ValidOnlyCode = function (FCode) {
        if (typeof $scope.itemPermission == 'undefined') {
            $scope.itemPermission = {};

        }
        $http({
            method: 'GET',
            url: '/api/CheckValidPermission/' + FCode,
        }).then(function successCallback(response) {

            if (response.data != 'undefined') {
                $scope.itemPermission = response.data;
                toastr.warning('Mã này đã tồn tại !', 'Thông báo');
            }
            else {

                $scope.itemPermission.Id = 0;
                $scope.itemPermission.FName = null;               
                $scope.itemPermission.FDescription = null;
                toastr.success('Có thể sử dụng mã này !', 'Thông báo');
            }
        }, function errorCallback(response) {
        });
    }
    //console.log($scope.itemPermission);
    if ($scope.itemPermission != undefined) $scope.read = true;
    else {
        $scope.itemPermission = {};
        $scope.read = false;
    }
});
/* Setup blank page controller */
angular.module('WebApiApp').controller('PermissionController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.cancelModal = function () {
        $uibModal.dismiss('close');
    }

    $scope.DeletePermission = function (Id) {
        if (confirm('Bạn có chắc chắn xóa bản ghi này ko ?')) {
            $http({
                method: 'DELETE',
                url: '/api/Permissions/' + Id
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available     

                toastr.warning('Đã xóa dữ liệu thành công !', 'Thông báo');
                $scope.LoadPermissions();
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                toastr.error('Không xóa được dữ liệu !', 'Thông báo');
            });
        }
    };

    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        //App.initAjax();
        //// set default layout mode
        //$rootScope.$settings.layout.pageContentWhite = true;
        //$rootScope.$settings.layout.pageBodySolid = false;
        //$rootScope.$settings.layout.pageSidebarClosed = true;
        // Simple GET request example:
        $scope.LoadPermissions();

    });

}]);