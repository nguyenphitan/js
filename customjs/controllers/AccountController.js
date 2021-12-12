angular.module('WebApiApp').controller('AccountController', function ($rootScope, $scope, $http, $timeout) {
    $scope.OnLoad = function () {
        $('#Email').inputmask('email');
    }
    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        formdata = new FormData();
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };
    $scope.uploadFiles = function () {
        var request = {
            method: 'POST',
            url: '/api/UpLoadImage',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        };
        // SEND THE FILES.
        $http(request)
            .success(function (d) {
                $scope.ListBMName = [];
                angular.forEach(formdata, function (value, key) {
                    if ($scope.ListBMName.indexOf(value.name) === -1) {
                        $scope.ListBMName.push(value.name);
                    }
                });
                $scope.Save();
            })
            .error(function () {
                toastr.error('Cập nhật ảnh đại diện không thành công !', 'Thông báo');
            });
    }
    $scope.Save = function () {
        $rootScope.user.Avatar = JSON.stringify($scope.ListBMName);
        $http({
            method: 'PUT',
            url: '/api/UserProfiles/' + $rootScope.user.Id,
            data: $rootScope.user
        }).then(function successCallback(response) {
            toastr.success('Thay đổi thông tin hồ sơ thành công', 'Thông báo');
            $scope.getUserInfo();
        }, function errorCallback(response) {
          
        });
    }
    $scope.ChangePass = function () {

        $http({
            method: 'POST',
            url: '/api/Account/ChangePassword',
            data: $scope.item
        }).then(function successCallback(response) {
            toastr.success('Thay đổi mật khẩu thành công', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            $scope.LoadError($scope.itemError.ModelState);
        });
    }
    $scope.getUserInfo = function () {
        $http({
            method: 'GET',
            url: '/api/GetCurrentUserProfiles',
            
        }).then(function successCallback(response) {
            $rootScope.userInfo = response.data;
        }, function errorCallback(response) {
           
        });
    }

    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        App.initAjax();
        $http({
            method: 'GET',
            url: '/api/GetCurrentUserProfiles',

        }).then(function successCallback(response) {
            $rootScope.user = response.data;
           // console.log($rootScope.user);
        }, function errorCallback(response) {

        });
        if ($rootScope.user.Avatar != null ) {
            $scope.ListBMName = JSON.parse($rootScope.user.Avatar);
        }
        else $scope.ListBMName = [];
    });


    // set sidebar closed and body solid layout mode
    $rootScope.$settings.layout.pageContentWhite = true;
    $rootScope.$settings.layout.pageBodySolid = false;
    $rootScope.$settings.layout.pageSidebarClosed = false;
});
