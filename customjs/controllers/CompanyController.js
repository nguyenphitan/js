angular.module('WebApiApp').controller("ModelCompanyHandlerController", function ($scope, $http, $uibModalInstance) {
    $scope.itemCompany = $scope.$resolve.itemCompany;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.SaveModal = function () {

        if (typeof $scope.itemCompany == 'undefined') {
            $scope.itemCompany = {};
            toastr.error('Chưa cập nhật số liệu !', 'Thông báo');
            return;
        }
        if (typeof $scope.itemCompany.Id == 'undefined' || $scope.itemCompany.Id == 0) {
            $http({
                method: 'POST',
                url: '/api/Companies',
                data: $scope.itemCompany
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
                $scope.LoadCompanies();
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
                url: '/api/Companies/' + $scope.itemCompany.Id,
                data: $scope.itemCompany
            }).then(function successCallback(response) {
                console.log(response);
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công Id = ' + $scope.itemCompany.Id + ' !', 'Thông báo');
                $scope.LoadCompanies();
                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemPerError = response.data;
                $scope.LoadError($scope.itemPerError.ModelState);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

    }
    $scope.ValidOnlyCode = function (FCode) {
        if (typeof $scope.itemCompany == 'undefined') {
            $scope.itemCompany = {};

        }
        $http({
            method: 'GET',
            url: '/api/CheckValidCompany/' + FCode,
        }).then(function successCallback(response) {

            if (response.data != 'undefined') {
                $scope.itemCompany = response.data;
                toastr.warning('Mã này đã tồn tại !', 'Thông báo');
            }
            else {

                $scope.itemCompany.Id = 0;
                $scope.itemCompany.FName = null;
                $scope.itemCompany.FDescription = null;
                $scope.itemCompany.Address = null;
                $scope.itemCompany.Mobile = null;
                $scope.itemCompany.Fax = null;
                $scope.itemCompany.Email = null;
                toastr.success('Có thể sử dụng mã này !', 'Thông báo');
            }
        }, function errorCallback(response) {
        });
    }
    $scope.ProvinChange = function (ProvinId, DistrictId, WardId) {
        $scope.LoadProvin(ProvinId, DistrictId, WardId);
    }
    if ($scope.itemCompany != undefined)
        if ($scope.itemCompany.Provin != undefined)
            $scope.ProvinChange($scope.itemCompany.Provin, $scope.itemCompany.District, $scope.itemCompany.Ward);
    if ($scope.itemCompany != undefined) $scope.read = true;
    else $scope.read = false;
});
/* Setup blank page controller */
angular.module('WebApiApp').controller('CompanyController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.cancelModal = function () {
        $uibModal.dismiss('close');
    }


    // Modal Edit Company
    $scope.openEditCompanyModal = function (itemCompany) {
        if (itemCompany == 'undifined') {
            //itemCompany = {
            //    "Id": "",
            //    "FCode": "",
            //    "FName": "",
            //    "FDescription": "",
            //    "Provin": "0",
            //    "District": "0",
            //    "Ward": "0"
            //};
            $scope.itemCompany = {};
        }

        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/EditCompany.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelCompanyHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            size: 'full',
            resolve: {
                itemCompany: function () { return itemCompany }
            }
        });

    }
    $scope.DeleteCompany = function (Id) {
        if (confirm('Bạn có chắc chắn xóa bản ghi này ko ?')) {
            $http({
                method: 'DELETE',
                url: '/api/Companies/' + Id
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available     

                toastr.warning('Đã xóa dữ liệu thành công !', 'Thông báo');
                $scope.LoadCompanies();
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
        $scope.LoadProvin("0", "0", "0");
        $scope.LoadCompanies();

    });

}]);