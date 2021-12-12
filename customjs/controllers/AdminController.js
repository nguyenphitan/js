
/* Setup blank page controller */
angular.module('WebApiApp').controller('AdminController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings, $timeout) {
    $scope.Import = function () {
        $http({
            method: 'POST',
            url: '/api/Org/ImportOrg'
        }).then(function successCallback(response) {
            toastr.success('Cập nhật dữ liệu thành công!', 'Thông báo');
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }

    $scope.selectedFile = null;
    $scope.msg = "";
    $scope.loadFile = function (files) {
        $scope.$apply(function () {
            $scope.selectedFile = files[0];
        })
    };
    $scope.handleFile = function () {
        var file = $scope.selectedFile;
        if ($scope.selectedFile == undefined) {
            toastr.warning("Bạn chưa chọn file tải lên !", "Thông báo")
        }
        else {
            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, { type: 'binary' });
                    var first_sheet_name = workbook.SheetNames[0];
                    var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);
                    if (dataObjects.length > 0) {
                        $scope.save(dataObjects);

                    } else {
                    }
                }
                reader.onerror = function (ex) {
                }
                reader.readAsBinaryString(file);
            }
        }

    }
    $scope.save = function (data) {

        $http({
            method: "POST",
            url: "api/SaveListOrg",
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (data) {
            toastr.success("Import file thành công!", "Thông báo")
        }, function (error) {
        })

    }
    $scope.$on('$viewContentLoaded', function () {
       
        App.initAjax();

        $rootScope.$settings.layout.pageContentWhite = true;
        $rootScope.$settings.layout.pageBodySolid = false;
        $rootScope.$settings.layout.pageSidebarClosed = false;
    

    });
}]);
