angular.module('WebApiApp').controller("ModelOrganizationHandlerController", function ($scope, $http, $uibModalInstance) {
    $scope.itemOrganization = $scope.$resolve.itemOrganization;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.SaveModal = function () {

        if (typeof $scope.itemOrganization == 'undefined') {
            $scope.itemOrganization = {};
            toastr.error('Chưa cập nhật số liệu !', 'Thông báo');
            //return;
        }
        if (typeof $scope.itemOrganization.Id == 'undefined') {
            $http({
                method: 'POST',
                url: '/api/Organizations',
                data: $scope.itemOrganization
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
                $scope.LoadOrganizations();
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
                url: '/api/Organizations/' + $scope.itemOrganization.Id,
                data: $scope.itemOrganization
            }).then(function successCallback(response) {
                console.log(response);
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công Id = ' + $scope.itemOrganization.Id + ' !', 'Thông báo');
                $scope.LoadOrganizations();
            }, function errorCallback(response) {
                $scope.itemPerError = response.data;
                $scope.LoadError($scope.itemPerError.ModelState);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
        $uibModalInstance.close('save');
    }
});
/* Setup blank page controller */
angular.module('WebApiApp').controller('OrganizationController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.cancelModal = function () {
        $uibModal.dismiss('close');
    }

    $scope.DeleteOrganization = function (Id) {
        if (confirm('Bạn có chắc chắn xóa bản ghi này ko ?')) {
            $http({
                method: 'DELETE',
                url: '/api/Organizations/' + Id
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available     

                toastr.warning('Đã xóa dữ liệu thành công !', 'Thông báo');
                $scope.LoadOrganizations();
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                toastr.error('Không xóa được dữ liệu !', 'Thông báo');
            });
        }
    };

    $scope.CompanyChange = function () {
        $scope.LoadTreeTextOrg();
        $scope.LoadTreeOrg();
       
    };

    $scope.LoadTreeOrg = function () {
        if ($scope.CoCode == "")
            return;
        $http({
            method: 'GET',
            url: '/Org/Tree/' + $scope.CoCode
        }).then(function successCallback(response) {        
            $scope.OrgTreeValue = response.data;
            $("#tree_3").jstree({
                "core": {
                    "themes": {
                        'responsive': false
                    },
                    // so that create works
                    "check_callback": true,
                    'data': $scope.OrgTreeValue
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
                "plugins": ["dnd", "state", "types"],
            });
            $('#tree_3').jstree(true).settings.core.data = $scope.OrgTree;
            $('#tree_3').jstree(true).refresh();
            $('#tree_3').on("select_node.jstree", function (e, data) {
                //if (data.node.id != null) {
                //    data.instance.deselect_node(data.node);
                //}
               
                $http({
                    method: 'GET',
                    url: '/api/Organizations/' + data.node.id
                }).then(function successCallback(response) {
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
                        width: null
                    });
                    $scope.Org = response.data;
                    $scope.ProvinChange($scope.Org.Provin, $scope.Org.Disctrict, $scope.Org.Ward);
                }, function errorCallback(response) {
                    });
                $scope.read = true;
                $scope.view = true;
            });
            //
        }, function errorCallback(response) {
          
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });

    }
    $scope.LoadTreeTextOrg = function () {
        if ($scope.CoCode == "")
            return;
        $http({
            method: 'GET',
            url: '/Org/TreeText/' + $scope.CoCode +'/ALL'
        }).then(function successCallback(response) {
            $scope.TreeTextOrgs = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.AddNew = function () {
        //$scope.LoadTreeOrg();
        $scope.Org.Id = undefined;
        $scope.Org.FCode = "";
        $scope.Org.FName = "";
        $scope.Org.FDescription = "";
        $scope.read = false;
        $scope.view = true;
    };

    $scope.SaveModal = function () {

        if (typeof $scope.Org == 'undefined') {
            $scope.Org = {};
            toastr.error('Chưa cập nhật số liệu !', 'Thông báo');
            return;
        }
        if (typeof $scope.Org.Id == 'undefined' || $scope.Org.Id == 0) {
            $http({
                method: 'POST',
                url: '/api/Organizations',
                data: $scope.Org
            }).then(function successCallback(response) {
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
                //$scope.LoadTreeOrg();
                $scope.LoadTreeTextOrg();
                $scope.Org.FCode = '';
                $scope.Org.FName = '';
            }, function errorCallback(response) {
                $scope.itemPerError = response.data;
                $scope.LoadError($scope.itemPerError.ModelState);
             
            });
        }
        else {
            $http({
                method: 'PUT',
                url: '/api/Organizations/' + $scope.Org.Id,
                data: $scope.Org
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
                //$scope.LoadTreeOrg();
                $scope.LoadTreeTextOrg();
            }, function errorCallback(response) {
                $scope.itemPerError = response.data;
                $scope.LoadError($scope.itemPerError.ModelState);
            });
        }

    }
    $scope.Onload = function () {
      
      
    }

    $scope.DeleteOrg = function (Id) {
        if (confirm('Bạn có chắc chắn xóa bản ghi này ko ?')) {
            $http({
                method: 'DELETE',
                url: '/api/Organizations/' + Id
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available     

                toastr.warning('Đã xóa dữ liệu thành công !', 'Thông báo');
                $scope.LoadTreeOrg();
                $scope.LoadTreeTextOrg();
                $scope.AddNew();
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                toastr.error('Không xóa được dữ liệu !', 'Thông báo');
            });
        }
    };
    $scope.ProvinChange = function (ProvinId, DistrictId, WardId) {

        $scope.LoadProvin(ProvinId, DistrictId, WardId);
    }
    $scope.init = function () {
        $scope.view = false;
        $scope.CoCode = $scope.DefaultOrganization;
        $scope.Org = {};
        $scope.LoadCompanies();
        $scope.LoadTreeOrg();
        $scope.LoadTreeTextOrg();
        $scope.LoadProvin("0", "0", "0");
    }
    $scope.ValidOnlyCode = function (FCode) {
        if (typeof $scope.item == 'undefined') {
            $scope.item = {};

        }
        $http({
            method: 'GET',
            url: '/api/CheckValidOrg/' + FCode,
        }).then(function successCallback(response) {

            if (response.data != 'undefined') {
                $scope.Org = response.data;
                toastr.warning('Mã này đã tồn tại !', 'Thông báo');
            }
            else {

                $scope.Org.Id = 0;
                $scope.item.FName = null;
                $scope.item.Address = null;
                $scope.item.FDescription = null;
                toastr.success('Có thể sử dụng mã này !', 'Thông báo');
            }
        }, function errorCallback(response) {
        });
    }
    $scope.$on('$viewContentLoaded', function () {
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
            width: null
        });
       
    });

}]);