/***
Metronic AngularJS App Main Script
***/
/* Metronic App */

var $stateProviderRef = null;
var WebApiApp = angular.module("WebApiApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    "ngCookies",
    "angularUtils.directives.dirPagination",
    "angular.filter",
    "ngCookies",
    "ngStorage",
    'ng.ckeditor'
    //"summernote",
    //'blueimp.fileupload'
]).filter('unique', function () {
    return function (collection, primaryKey) { //no need for secondary key
        var output = [],
            keys = [];
        var splitKeys = primaryKey.split('.'); //split by period


        angular.forEach(collection, function (item) {
            var key = {};
            angular.copy(item, key);
            for (var i = 0; i < splitKeys.length; i++) {
                key = key[splitKeys[i]];    //the beauty of loosely typed js :)
            }

            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});
//WebApiApp.config(function (paginationTemplateProvider) {
//    paginationTemplateProvider.setPath('js/tempPagination/dirPagination.tpl.html');
//});
/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
WebApiApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({

    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
WebApiApp.config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global $settings */
WebApiApp.factory('$settings', ['$rootScope', function ($rootScope) {
    // supported languages

    var $settings = {
        layout: {
            pageSidebarClosed: true, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load

        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout',
    };
    return $settings;
}]);
//WebApiApp.factory('Excel', function ($window) {
//    var uri = 'data:application/vnd.ms-excel;base64,',
//        template = '<!--[if gte mso 9]&gt;{worksheet}&lt;![endif]--><table>{table}</table>',
//        base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
//        format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
//    return {
//        tableToExcel: function (tableId, worksheetName) {
//            var table = $(tableId),
//                ctx = { worksheet: worksheetName, table: table.html() },
//                href = uri + base64(format(template, ctx));
//            return href;
//        }
//    };
//})
/* Setup App Main Controller */
WebApiApp.controller('AppController', ['$stateParams', '$scope', '$rootScope', '$http', '$uibModal', '$cookies', '$state', function ($stateParams, $scope, $rootScope, $http, $uibModal, $cookies, $state) {
    //$scope.$on('$viewContentLoaded', function () {
    //    App.initAjax();
    //    //ComponentsSelect2.init();
    //});
    $scope.ArrayTT = []
    $scope.AuthorizationPermission = function (permission, fcode) {
        var bool = false;
        var it = $rootScope.listPer.filter(x => x.FCode === fcode & x.CodePermission.includes('$' + permission + '=TRUE$'));

        if (it.length > 0) {
            bool = true;
        }
        return bool;
    }
    $scope.config = {};
    $scope.config.toolbarGroups = [
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
    ];
    $scope.config.removeButtons = 'BGColor,Anchor,Subscript,Superscript,Paste,Copy,Cut,Undo,Redo';


    $scope.optionsEditor = {
        height: 150,
        toolbar: [
            ['style', ['bold', 'italic', 'underline']],
            ['para', ['ul', 'ol']]
        ]
    };

    // Lấy danh sách Menu chính
    $scope.LoadMainMenus = function () {
        $http({
            method: 'GET',
            url: '/api/MainMenus'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.MainMenu = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadBM = function () {
        $http({
            method: 'GET',
            url: '/api/getBM'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.BM = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadDropAreas = function () {
        $http({
            method: 'GET',
            url: '/Org/loadAreas'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.DropAreas = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadLHDN = function () {
        $http({
            method: 'GET',
            url: '/api/getLHDN'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.LHDN = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadGroups = function () {
        $http({
            method: 'GET',
            url: '/api/Groups'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.Group = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.DropYear = [
        //new Date().getFullYear() - 1,
    new Date().getFullYear(),
        new Date().getFullYear() - 1,
        new Date().getFullYear() - 2
        , new Date().getFullYear() - 3
        , new Date().getFullYear() - 4
        , new Date().getFullYear() - 5
        , new Date().getFullYear() - 6
        , new Date().getFullYear() - 7
        , new Date().getFullYear() - 8
        , new Date().getFullYear() - 9
        //, new Date().getFullYear() - 10
        //, new Date().getFullYear() - 11
        //, new Date().getFullYear() - 12
        //, new Date().getFullYear() - 13
        //, new Date().getFullYear() - 14
        //, new Date().getFullYear() - 15
        //, new Date().getFullYear() - 16
        //, new Date().getFullYear() - 17
        //, new Date().getFullYear() - 18

    ]
    $scope.getPageBar = function (code) {
        var obj = $rootScope.sidebar.filter(t => t.FCode == code);
        if (obj != null && obj.length > 0)
            return obj[0].FName;
        else return '';
    }
    $scope.displayPage = [
        {
            "value": 15,
            "text": '15 bản ghi',
        },
        {
            "value": 25,
            "text": '25 bản ghi',
        },
        {
            "value": 50,
            "text": '50 bản ghi',
        },
        {
            "value": 75,
            "text": '75 bản ghi',
        },
        {
            "value": 100,
            "text": '100 bản ghi',
        }
    ]

    $scope.LoadTypeInspection = function () {
        $http({
            method: 'GET',
            url: '/api/getLoaGiayTo'
        }).then(function successCallback(response) {
            $scope.LoaiGiayTo = response.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.StepInspection = function () {
        $http({
            method: 'GET',
            url: '/api/getStep'
        }).then(function successCallback(response) {
            $scope.Step = response.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.openEditMainMenuModal = function (itemMainMenu) {
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/EditMainMenu.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelMainMenuHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            size: 'full',
            resolve: {
                itemMainMenu: function () { return itemMainMenu }
            }
        });
    }
    $scope.LoadCD = function () {
        $http({
            method: 'GET',
            url: '/api/GetAllChucDanh'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.ChucDanh = response.data;
            // ////console.log($scope.ChucDanh);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }

    // Lấy danh sách quyền
    $scope.LoadPermissions = function () {
        $http({
            method: 'GET',
            url: '/api/Permissions'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.Permission = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadDTTT = function () {
        $http({
            method: 'GET',
            url: '/api/getDoiTuongTT'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.DTTT = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    // Modal Edit Permission
    $scope.openEditPermissionModal = function (itemPermission) {
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/EditPermission.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelPermissionHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            size: 'full',
            resolve: {
                itemPermission: function () { return itemPermission }
            }
        });
    }
    // Lấy danh sách công ty
    $scope.LoadCompanies = function () {
        $http({
            method: 'GET',
            url: '/api/Companies'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.Company = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu Companies!', 'Thông báo');
        });
    }

    $scope.DefaultArea = "35";
    $scope.DefaultOrganization = 'COM000045';
    $scope.LoadProvin = function (ProvinId, DistrictId, WardId) {
        if (ProvinId == "0") {
            $http({
                method: 'GET',
                url: '/Area/TINH/' + ProvinId,
            }).then(function successCallback(response) {
                $scope.Provin = response.data;
            }, function errorCallback(response) {
                toastr.warning('Có lỗi trong quá trình tải dữ liệu Provin!', 'Thông báo');
            });
        }
        else {
            if (DistrictId == "0") {
                $http({
                    method: 'GET',
                    url: '/Area/HUYEN/' + ProvinId,
                }).then(function successCallback(response) {
                    $scope.District = response.data;
                }, function errorCallback(response) {
                    toastr.warning('Có lỗi trong quá trình tải dữ liệu District!', 'Thông báo');
                });
            }
            else {
                $http({
                    method: 'GET',
                    url: '/Area/HUYEN/' + ProvinId,
                }).then(function successCallback(response) {
                    $scope.District = response.data;

                }, function errorCallback(response) {
                    toastr.warning('Có lỗi trong quá trình tải dữ liệu District!', 'Thông báo');
                });

                $http({
                    method: 'GET',
                    url: '/Area/XA/' + DistrictId,
                }).then(function successCallback(response) {
                    $scope.Ward = response.data;
                }, function errorCallback(response) {
                    toastr.warning('Có lỗi trong quá trình tải dữ liệu District!', 'Thông báo');
                });
            }

        }
    }

    $scope.LoadDeparment = function (CoCode, type) {
        if (CoCode == '' || CoCode == 'undifined')
            return;
        $http({
            method: 'GET',
            url: '/Org/TreeText/' + CoCode + '/' + type
        }).then(function successCallback(response) {

            $scope.TreeTextDeparment = response.data;
        }, function errorCallback(response) {

            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }




    // Lấy danh sách Menu hệ thống
    $scope.LoadMenus = function () {
        $http({
            method: 'GET',
            url: '/api/Menus'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.Menu = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });

    }
    //Lấy danh sách quyền
    $scope.GetPermission = function () {
        $http({
            method: 'GET',
            url: '/api/ApiMenus/GetPermission/'
        }).then(function successCallback(response) {
            $scope.Permission = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.getDropStep = function (fcode) {
        $http({
            method: 'GET',
            url: '/Org/loadDropStep/' + fcode,
        }).then(function successCallback(response) {
            $scope.DropStep = response.data;
            // ////console.log(response.data);
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    // Lấy danh sách Menu hệ thống
    $scope.GetDropMenu = function () {
        $http({
            method: 'GET',
            url: '/api/ApiMenus/GetMenusByLevel/'
        }).then(function successCallback(response) {
            $scope.DropMenu = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }

    $scope.GetMenusByLevel = function () {

        $http({
            method: 'GET',
            url: '/api/ApiMenus/GetMenusByLevel/'
        }).then(function successCallback(response) {
            $scope.MenuLevel = response.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }

    // Lấy ID tự động
    $scope.AutoID = function (Code) {

        $http({
            method: 'POST',
            url: '/AutoId/' + Code
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.objAutoID = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tạo ID tự động !', 'Thông báo');
        });
    }
    // Lấy ID tự động
    $scope.AutoIDCallBack = function (Code, res) {

        $http({
            method: 'POST',
            url: '/AutoId/' + Code
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.objAutoID = response.data;
            // ////console.log(response.data)
            return res(response.data);

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tạo ID tự động !', 'Thông báo');
            return res(response);
        });
    }
    $scope.LoadError = function (err) {
        var i = 0;
        for (var prop in err) {
            if (err.hasOwnProperty(prop) && prop != null) {
                toastr.error(err[prop][0], 'Lỗi cập nhật dữ liệu');
                $("#" + prop).focus();
                i++;
                if (i == 1) return;
            }

        }
    }

    // GetType- ThanhTraKiemTra
    $scope.TypeInspection = function () {
        $http({
            method: 'GET',
            url: '/api/GetAllTypeInspections'
        }).then(function successCallback(response) {
            $scope.TypeInspections = response.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu TypeInspection!', 'Thông báo');
        });
    }
    $scope.LoaiHinhTT = function () {
        $http({
            method: 'GET',
            url: '/api/GetAllLoaiHinhTTs'
        }).then(function successCallback(response) {
            $scope.LoaiHinhTTs = response.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu LoaiHinhTT!', 'Thông báo');
        });
    }
    $scope.LoaiHinhTTByType = function (Type, checkLH) {
        $http({
            method: 'GET',
            url: '/api/LoaiHinhTTs/GetLoaiHinhTTbyType',
            params: {
                Type: Type,
                checkLH: checkLH
            }
        }).then(function successCallback(response) {
            $scope.LoaiHinhTTbyTypes = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu LoaiHinhTT!', 'Thông báo');
        });
    }
    $scope.openModalItem = function (item, Code, size, Controller, tempUrl) {
        if (item.FBranchCode == null)
            item.FBranchCode = Code;
        var templateUrl = 'views-client/' + tempUrl + '.html?bust=' + Math.random().toString(36).slice(2);;//'views-client/template/Edit' + type + '.html?bust=' + Math.random().toString(36).slice(2);
        var controller = Controller;// 'Model' + type + 'HandlerController';
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: templateUrl,
            controller: controller,
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: size,
            resolve: {
                itemModal: function () { return item }
            }
        });

    }

    $scope.openEditMenuModal = function (itemMenu) {

        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/EditMenu.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelMenuHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            resolve: {
                itemMenu: function () { return itemMenu }
            }
        });
    }
    $scope.LoadListObjByInspection = function (FInspection, year, callback) {
        $http({
            method: 'GET',
            url: '/api/Inspections/GetObjectByInspections?F_inspection=' + FInspection + '&year=' + year
        }).then(function successCallback(response) {
            return callback(response.data);
        }, function errorCallback() {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
            return;
        });
    }
    $scope.openEditItem = function (itemUser, type, Code) {
        if (itemUser.FBranchCode == null)
            itemUser.FBranchCode = Code;


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
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                itemUser: function () { return itemUser }
            }

        });


    }
    $scope.openModal = function (item, type, check, item1) {

        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/ThiDuaKhenThuong/Modal/Modal' + type + '.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'Modal' + type + 'Controller',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                item: function () { return item },
                check: function () { return check },
                item1: function () { return item1 }

            }
        });

    }
    $scope.LoadObject = function () {
        $http({
            method: 'GET',
            url: '/api/ObjectInspect/GetAll'
        }).then(function successCallback(response) {
            $scope.Object = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadOrg = function () {
        $http({
            method: 'GET',
            url: '/api/Organizations'
        }).then(function successCallback(response) {
            $scope.Organizations = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadListALLObjByInspection = function (FInspection, year, callback) {
        $http({
            method: 'GET',
            url: '/api/Inspections/GetALLObjectByInspections?F_inspection=' + FInspection + '&year=' + year
        }).then(function successCallback(response) {
            return callback(response.data);
        }, function errorCallback() {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
            return;
        });
    }
    $scope.LogOut = function () {
        $http({
            method: 'POST',
            url: 'api/Account/Logout'
        }).then(function successCallback(response) {
            $cookies.remove("username");
            $cookies.remove("token_type");
            $cookies.remove("token");
            window.location.assign('/login.html');
        }, function errorCallback(response) {
            toastr.warning('Đăng xuất thất bại!', 'Thông báo');
        });
    }
    $rootScope.GetNotificationTTDX = function () {
        $http({
            method: 'GET',
            url: 'api/Index/GetNotificationTTDX',

        }).then(function successCallback(response) {
            $rootScope.NotificationTTDX = response.data;
            $rootScope.NotiKHCD();
            $rootScope.Noti_DonVi();
            $rootScope.Mess_User();
            $rootScope.Noti_OrgLead();
        }, function errorCallback(response) {

        });
    }

    $rootScope.CheckReadNotiTTDX = function (FCode) {
        console.log(FCode)
        $http({
            method: 'POST',
            url: 'api/Index/CheckReadNotiTTDX',
            params: { FCode: FCode }
        }).then(function successCallback(response) {
            //  $rootScope.NotificationTTDX = response.data;
            $rootScope.GetNotificationTTDX();
        }, function errorCallback(response) {

        });
    }

    $rootScope.NotiKHCD = function () {
        $http({
            method: 'GET',
            url: '/api/Index/GetNotification',
            params: { status: 'GDKH' }
        }).then(function successCallback(response) {
            $rootScope.Notification = response.data;
        }, function errorCallback(response) {

        });
    }
    $rootScope.Noti_DonVi = function () {
        $http({
            method: 'GET',
            url: '/api/Index/GetNotification_DV',
        }).then(function successCallback(response) {
            $rootScope.Notification_DV = response.data;
            //console.log($rootScope.Notification_DV);
        }, function errorCallback(response) {

        });
    }

    $rootScope.Noti_OrgLead = function () {
        $http({
            method: 'GET',
            url: '/api/Index/GetMessOrgLead',
            //params: { status: 'GDKH' }
        }).then(function successCallback(response) {
            $rootScope.Notification_OrgLead = response.data;
            //console.log($rootScope.Notification_OrgLead)
        }, function errorCallback(response) {

        });
    }
    $rootScope.Mess_User = function () {
        $http({
            method: 'GET',
            url: '/api/Index/GetMessReceived',
        }).then(function successCallback(response) {
            $rootScope.MessReceived = response.data;
        }, function errorCallback(response) {

        });
    }
    $scope.LinkToMenu = function (type) {
        if (type == 'DDKH') {
            $state.go("KHTTDD", {
                param: {
                    Url: 'Inspect/InspectionApprove.html',
                    ControllerName: 'InspectionApproveController',
                    FCode: 'KHTTDD',
                    ParentMenu: 'KHTTKT'
                }
            })
        }
        if (type == 'KDKH') {
            $state.go("KHTT", {
                param: {
                    Url: 'Inspect/Inspection.html',
                    ControllerName: 'InspectionController',
                    FCode: 'KHTT',
                    ParentMenu: 'KHTTKT'
                }
            })
        }
        if (type == 'KHCD') {
            $state.go("KHCD", {
                param: {
                    Url: 'Inspect/Plan.html',
                    ControllerName: 'PlanController',
                    FCode: 'KHCD',
                    ParentMenu: 'QLDKH'
                }
            })
        }
        if (type == 'MESS') {
            $state.go("RECEIVED_NOTI", {
                param: {
                    Url: 'ReceivedNoti.html',
                    ControllerName: 'ReceivedNotiController',
                    FCode: 'RECEIVED_NOTI',
                    ParentMenu: 'NOTIFICATION'
                }
            })
        }
    }
    $scope.TotalNoti = function (pr1, pr2, pr3, pr4, pr5) {
        if (pr1 == undefined) pr1 = 0;
        if (pr2 == undefined) pr2 = 0;
        if (pr3 == undefined) pr3 = 0;
        if (pr4 == undefined) pr4 = 0;
        if (pr5 == undefined) pr5 = 0;
        var total = 0;
        if ($rootScope.CheckDisplay == 1)
            total = pr1 + pr2 + pr3 + pr4 + pr5;
        else total = pr2 + pr3 + pr4 + pr5;
        return total;
    }
    $scope.LinkToInspection = function (fcode) {
        $state.go("UPLOAD", {
            param: {
                Url: 'DetailInspection.html',
                ControllerName: 'DetailInspectionController',
                FCode: 'UPLOAD',
                ParentMenu: 'TTTT',
                Action: 'EDIT',
                Id: fcode,
            }
        })

    }

    $scope.LoadAllActivityInspect = function () {
        $http({
            method: 'GET',
            url: 'api/GetAllActivityInspect'
        }).then(function successCallback(response) {
            $scope.ActivityInspect = response.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu hoạt động thanh tra!', 'Thông báo');
        });
    }
    $scope.LoadLinhVuc = function () {
        $http({
            method: 'GET',
            url: 'api/NDKiemTrung/GetAllNDKiemTrung'
        }).then(function successCallback(response) {
            $scope.LinhVucNoTree = [];
            angular.forEach(response.data, function (item) {
                var obj = {};
                obj.FCode = item.FCode;
                obj.FName = item.FName;
                $scope.LinhVucNoTree.push(obj);
            })
            $scope.LinhVuc = $scope.LoadTreeText(response.data);
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu Lĩnh vực!', 'Thông báo');
        });
    }
    $scope.LoadTreeText = function (dataAll) {
        //debugger
        var tree = [];
        var arrparent = dataAll.filter(t => t.FParent == null || t.FParent == '');
        var i = 1;
        angular.forEach(arrparent, function (item) {
            item.FName = i + '.' + item.FName;
            tree.push(item);
            var arrChild = dataAll.filter(t => t.FParent == item.FCode);
            if (arrChild.length > 0)
                $scope.LoadChildText(dataAll, arrChild, i, tree);
            i = i + 1;
        });
        return tree;
    }
    $scope.LoadChildText = function (dataAll, data, j, arr) {

        //var arrChild = dataAll.filter(t => t.FParent == item.Fcode);
        var i = 1;
        angular.forEach(data, function (item) {
            var stt = j + '.' + i;
            item.FName = stt + '. ' + item.FName;
            arr.push(item);
            var arrChild = dataAll.filter(t => t.FParent == item.FCode);
            if (arrChild.length > 0)
                $scope.LoadChildText(dataAll, arrChild, stt, arr);
            i = i + 1;
        });
    }

    $scope.getNameLinhVuc = function (CodeLV) {
        var arr = $scope.LinhVucNoTree.filter(t => t.FCode == CodeLV);
        if (arr != null) return arr[0].FName;
        else return '';
    }
    $scope.LoadDropDanhHieu = function () {
        $http({
            method: 'GET',
            url: 'api/DHTDKT/DropDHTDKT'
        }).then(function successCallback(response) {

            $scope.DropDanhHieuCaNhan = response.data.DHCN;
            $scope.DropDanhHieuTapThe = response.data.DHTT;
            $scope.DropDanhHieuHoGiaDinh = response.data.DHHGD;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.LoadDanhHieu = function () {

        $http({
            method: 'GET',
            url: 'api/DHTDKT/Get?searchkey=&pageNumber=1&pageSize=9999'
        }).then(function successCallback(response) {

            $scope.DanhHieu = response.data.skt;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.LoadLoaiHinh = function () {

        $http({
            method: 'GET',
            url: 'api/TypeTDKT/Get?searchkey=&pageNumber=1&pageSize=9999'
        }).then(function successCallback(response) {

            $scope.LoaiHinh = response.data.lhkt;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.LoadHinhThuc = function () {

        $http({
            method: 'GET',
            url: 'api/HTKT/GetAllHTKT'
        }).then(function successCallback(response) {

            $scope.HinhThuc = response.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.LoadThanhTich = function (htkt) {

        $http({
            method: 'GET',
            url: 'api/ThanhTichKhenThuong/GetDropThanhTichKhenThuong?htkt=' + htkt
        }).then(function successCallback(response) {

            $scope.ThanhTich = response.data;
            // console.log(response.data)
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.GetDsDonVi = function () {
        $http({
            method: 'GET',
            url: 'api/CaNhan/GetDvi',
        }).then(function successCallback(response) {
            $scope.DsDonVi = response.data;
            $scope.Org = [];
            $scope.Org1 = [];
            angular.forEach(response.data, function (value, key) {
                var obj = {
                    FCode: value.FCode,
                    TenDV: value.TenDV,
                    check: false,
                };
                var obj1 = {
                    FCode: value.FCode,
                    TenDV: value.TenDV,
                    check: false,
                };

                $scope.Org.push(obj);
                $scope.Org1.push(obj1);
               // console.log($scope.Org1);
            })

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    };
    $scope.LoadDsHinhThuc = function () {
        $http({
            method: 'GET',
            url: 'api/HTKT/GetHTKT?pageNumber=1&pageSize=9999999&searchKey=&FCode='
        }).then(function successCallback(response) {
            $scope.DsHinhThuc = response.data.HTKT;
           // console.log($scope.DsHinhThuc);
            $scope.BCHT = [];
            angular.forEach(response.data.HTKT, function (value, key) {
                var obj = {
                    FCode: value.FCode,
                    FName: value.FName,
                    check: false,
                };


                $scope.BCHT.push(obj);

            })

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.LoadDsCapQd = function () {
        $http({
            method: 'GET',
            url: 'api/ReportTDKT/CapQd'
        }).then(function successCallback(response) {
          //  $scope.DsHinhThuc = response.data;
            $scope.BCCQD = [];
            angular.forEach(response.data, function (value, key) {
                var obj = {
                    FCode: value.FCode,
                    FName: value.FName,
                    check: false,
                };
                $scope.BCCQD.push(obj);
            })
            console.log($scope.BCCQD);
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.LoadDsDanhHieu = function () {
        $http({
            method: 'GET',
            url: 'api/ReportTDKT/DanhHieu'
        }).then(function successCallback(response) {
           // $scope.DsHinhThuc = response.data;
            $scope.BCDH = [];
            angular.forEach(response.data, function (value, key) {
                var obj = {
                    FCode: value.FCode,
                    FName: value.FName,
                    check: false,
                };


                $scope.BCDH.push(obj);
            })

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.openModalImportExcel = function (item) {
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/ThiDuaKhenThuong/Modal/ModalImportExcel.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ImportExcelController',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'full',
            index: 10000,
            resolve: {
                item: function () { return item }

            }
        });

    }
}]);//])


WebApiApp.controller("ModelPasswordHandlerController", function ($cookies, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.itemUser;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    //  $scope.item.UserName = $cookies.get('username');
    //////console.log($cookies.get('username'));
    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: '/api/Account/ChangePassword',
            data: $scope.item
        }).then(function successCallback(response) {
            //////console.log(response);
            // this callback will be called asynchronously
            // when the response is available
            toastr.success('Thay đổi mật khẩu thành công', 'Thông báo');
            $uibModalInstance.close('save');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            $scope.LoadError($scope.itemError.ModelState);
        });
    }

});
/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
WebApiApp.controller('HeaderController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {

        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
WebApiApp.controller('SidebarController', ['$state', '$scope', function ($state, $scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initSidebar($state); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
WebApiApp.controller('QuickSidebarController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        setTimeout(function () {
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
WebApiApp.controller('ThemePanelController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
WebApiApp.controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-right",
            "onclick": null,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
        }
    });


}]);
WebApiApp.directive('fixedTableHeaders', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $timeout(function () {

                container = element.parentsUntil(attrs.fixedTableHeaders);
                element.stickyTableHeaders({ scrollableArea: container, "fixedOffset": 2 });

            }, 0);
        }
    }
}]);









/* Init global $settings and run the app */
WebApiApp.run(["$rootScope", "$http", "$cookies", "$settings", "$state", "$stateParams", "$urlRouter", "$cookieStore", function ($rootScope, $http, $cookies, $settings, $state, $stateParams, $cookieStore, $urlRouter) {


    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = $settings; // state to be accessed from view
    $rootScope.$stateParams = $stateParams;
    $rootScope.avatar = [];


    if ($cookies.get('username') == 'undefined' || $cookies.get('username') == null)
        window.location.assign('/login.html');
    else {
        $http.defaults.headers.common.Authorization = $cookies.get('token_type') + ' ' + $cookies.get('token');
        $http({
            method: 'GET',
            url: '/api/GetCurrentUserProfiles',

        }).then(function successCallback(response) {
            $rootScope.user = response.data;
            if (response.data.Avatar != null)
                $rootScope.avatarArr = JSON.parse(response.data.Avatar)
        }, function errorCallback(response) {

        });
        //$http({
        //    method: 'GET',
        //    url: '/api/UserProfile/GetDVOfUser',
        //}).then(function successCallback(rs) {
        //    $cookies.put('DonVi', rs.data.FName);
        //    $cookies.put('FCodeDV', rs.data.FCode);
        //    $rootScope.DonViTitle = rs.data.FName;
        //}, function errorCallback(response) {
        //    //toastr.error('Cập nhật trạng thái không thành công !', 'Thông báo');
        //});
    };

    onStartInterceptor = function (data, headersGetter) {
        App.startPageLoading({ animate: true });
        //App.startPageLoading({ message: 'Đang tải dữ liệu vui lòng chờ ...', overlayColor: 'red' });
        //////console.log('loading data ...');
        return data;
    }
    onCompleteInterceptor = function (data, headersGetter) {
        App.stopPageLoading();
        //////console.log('End loading data ...');
        return data;
    }
    //////console.log($http.defaults);
    $http.defaults.transformRequest.push(onStartInterceptor);
    $http.defaults.transformResponse.push(onCompleteInterceptor);

    $http({
        method: 'POST',
        url: '/api/getMenuByUser',
    }).then(function successCallback(response) {
        $rootScope.sidebar = response.data;


    }, function errorCallback(response) {

    });

    $http({
        method: 'POST',
        url: '/api/DislayByPermission',
    }).then(function successCallback(response) {
        $rootScope.listPer = response.data;
    }, function errorCallback(response) {
    });

    //$rootScope.ArrayCol = [{ FCode: "STT1", FName: "STT1", FIndex: '1' },
    // { FCode: "STT2", FName: "STT2", FIndex: '2' },
    // { FCode: "STT3", FName: "STT3", FIndex: '3' },
    // { FCode: "HoTen", FName: "Họ và tên", FIndex: '4' },
    // { FCode: "NamSinh", FName: "Năm sinh", FIndex: '5' },
    // { FCode: "ChinhQuan", FName: "Chính Quán", FIndex: '6' },
    // { FCode: "Chucvu", FName: "Chức vụ hiện tại", FIndex: '7' },
    // { FCode: "ChucvuKT", FName: "Chức vụ khen thưởng", FIndex: '8' },
    // { FCode: "NoiDung1", FName: "Thời gian giữ chức vụ", FIndex: '9' },
    // { FCode: "NoiDung2", FName: "Thời gian chuyển phục vụ kháng chiến", FIndex: '10' },
    // { FCode: "NoiDung3", FName: "Nội dung 3", FIndex: '11' },
    // { FCode: "KyLuat", FName: "Kỷ luật", FIndex: '12' },
    // { FCode: "GhiChu", FName: "Ghi chú", FIndex: '13' },
    // { FCode: "ThongTinBS1", FName: "Thông tin BS1", FIndex: '14' },
    // { FCode: "NoiDungBS1", FName: "Nội dung BS1", FIndex: '15' },
    // { FCode: "ThongTinBS2", FName: "Thông tin BS2", FIndex: '16' },
    // { FCode: "NoiDungBS2", FName: "Nội dung BS2", FIndex: '17' },
    // { FCode: "ThongTinBS3", FName: "Thông tin BS3", FIndex: '18' },
    // { FCode: "NoiDungBS3", FName: "Nội dung BS3", FIndex: '19' },
    // { FCode: "ThongTinBS4", FName: "Thông tin BS4", FIndex: '20' },
    // { FCode: "NoiDungBS4", FName: "Nội dung BS4", FIndex: '21' },
    // { FCode: "ThongTinBS5", FName: "Thông tin BS5", FIndex: '22' },
    // { FCode: "NoiDungBS5", FName: "Nội dung BS5", FIndex: '23' },
    //]
    //});

}]);

WebApiApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
    $urlRouterProvider.otherwise("dashboard");
    $urlRouterProviderRef = $urlRouterProvider;
    $stateProviderRef = $stateProvider;


    $stateProvider
        .state('CREATE_NOTI', {
            url: "/CREATE_NOTI",
            templateProvider: function ($templateRequest, $stateParams) {



                var templateName = "views-client/template/CreateNoti.html?bust=" + Math.random().toString(36).slice(2);
                return $templateRequest(templateName);
            },

            params: {
                param: null
                //ViewName: null,
                //Controller: null,
                //Title: null
            },
            data: {
                pageTitle: 'PHẦN MỀM QUẢN LÝ THI ĐUA KHEN THƯỞNG'
            },
            controllerProvider: ['$stateParams', function ($stateParams) {
                var controller = 'CreateNotiController';
                //var arr = $stateParams.param.ControllerName.split('/');
                //if (arr.length > 1) controller = arr[arr.length - 1]; else controller = $stateParams.param.ControllerName;
                return controller;
            }],
            resolve: {

                deps: ['$ocLazyLoad', '$stateParams', function ($ocLazyLoad, $stateParams) {
                    return $ocLazyLoad.load({
                        name: 'WebApiApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            //'assets/pages/scripts/components-select2.js',
                            // 'js/Service/InspectionService.js',
                            'js/controllers/CreateNotiController.js?bust=' + Math.random().toString(36).slice(2)
                        ]
                    });
                }],

            }
        })

    // Dashboard
    $stateProvider.state('dashboard', {

        url: "/dashboard",
        templateUrl: "views-client/dashboard.html?bust=" + Math.random().toString(36).slice(2),

        data: { pageTitle: 'PHẦN MỀM QUẢN LÝ THI ĐUA KHEN THƯỞNG' },
        controller: "DashboardController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'WebApiApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files: [
                        '../assets/global/plugins/morris/morris.css',
                        '../assets/global/plugins/morris/morris.min.js',
                        '../assets/global/plugins/morris/raphael-min.js',
                        '../assets/global/plugins/jquery.sparkline.min.js',

                        '../assets/pages/scripts/dashboard.min.js',
                        'js/controllers/DashboardController.js',
                    ]
                });
            }]
        }
    })
        .state('account', {

            url: "/account/" + "?eraseCache=true",
            templateUrl: "views-client/profile/account.html?bust=" + Math.random().toString(36).slice(2),

            data: { pageTitle: 'Hệ thống' },
            controller: "AccountController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'WebApiApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/global/plugins/morris/morris.css',
                            '../assets/global/plugins/morris/morris.min.js',
                            '../assets/global/plugins/morris/raphael-min.js',
                            '../assets/global/plugins/jquery.sparkline.min.js',

                            'js/controllers/AccountController.js',
                        ]
                    });
                }]
            }
        })
        .state('tdkt', {

            url: "/tdkt" + "?eraseCache=true",
            templateUrl: "views-client/template/TDKT.html?bust=" + Math.random().toString(36).slice(2),

            data: { pageTitle: 'Hệ thống' },
            controller: "TDKTController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'WebApiApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/global/plugins/morris/morris.css',
                            '../assets/global/plugins/morris/morris.min.js',
                            '../assets/global/plugins/morris/raphael-min.js',
                            '../assets/global/plugins/jquery.sparkline.min.js',

                            'js/controllers/TDKTController.js',
                        ]
                    });
                }]
            }
        })
        .state('NewQDKT', {
            url: "/ChinhSuaQDKT/{SoQD}" + "?eraseCache=true",
            params: {
                type: null,
                item: null
            },
            data: {
                pageTitle: 'PHẦN MỀM QUẢN LÝ THI ĐUA KHEN THƯỞNG'
            },
            templateUrl: 'views-client/template/ThiDuaKhenThuong/NewQDKT.html',
            controller: "NewQDKTController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'WebApiApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/global/plugins/morris/morris.css',
                            '../assets/global/plugins/morris/morris.min.js',
                            '../assets/global/plugins/morris/raphael-min.js',
                            '../assets/global/plugins/jquery.sparkline.min.js',

                            'js/controllers/ThiDuaKhenThuong/NewQDKTController.js',
                        ]
                    });
                }]
            }
        })
        .state('DSKTKC', {

            url: encodeURI("/"+window.btoa(unescape(encodeURIComponent("DSKTKC")))+"/:codeDs&:nameDs"),
            data: {
                pageTitle: 'PHẦN MỀM QUẢN LÝ THI ĐUA KHEN THƯỞNG'
            },
            templateUrl: 'views-client/template/ThiDuaKhenThuong/TTDSKT.html',
            controller: "TTDSKTController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'WebApiApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                             '../assets/global/plugins/morris/morris.css',
                            '../assets/global/plugins/morris/morris.min.js',
                            '../assets/global/plugins/morris/raphael-min.js',
                            '../assets/global/plugins/jquery.sparkline.min.js',

                            'js/controllers/ThiDuaKhenThuong/TTDSKTController.js',
                        ]
                    });
                }]
            }
        })

}]);
WebApiApp.run(['$q', '$rootScope', '$http', '$urlRouter', '$settings', '$cookies',
    function ($q, $rootScope, $http, $urlRouter, $settings, $cookies) {
        $("#DonVi").select2({
            escapeMarkup: function (m) { return m; },
            width: null
        });
        $rootScope.$on('$includeContentLoaded', function () {
            // $rootScope.GetNotificationTTDX();
            Layout.initHeader(); // init header
        });
        console.log('btoa(string)', btoa('angularjs'))
        //$http({
        //    method: 'GET',
        //    url: '/api/Index/GetNotification',
        //    params: { status: 'GDKH' }
        //}).then(function successCallback(response) {
        //    $rootScope.Notification = response.data;
        //}, function errorCallback(response) {

        //});
        //$http({
        //    method: 'GET',
        //    url: '/api/UserProfiles/GetRoleOfCurentUser',
        //}).then(function successCallback(response) {
        //    $rootScope.CheckDisplay = response.data;
        //    if ($rootScope.CheckDisplay == '1')
        //        $rootScope.DonVi = '';
        //    else $rootScope.DonVi = $cookies.get('FCodeDV');

        //    //$rootScope.LoadTreeTextOrg();
        //    //$rootScope.LoadInpection();
        //}, function errorCallback(response) {

        //});
        $rootScope.ArrayCol = [{ FCode: "STT1", FName: "STT1" },
        { FCode: "STT2", FName: "STT2" },
        { FCode: "STT3", FName: "STT3" },
        { FCode: "HoTen", FName: "Họ và tên" },
        { FCode: "NamSinh", FName: "Năm sinh" },
        { FCode: "ChinhQuan", FName: "Chính Quán" },
        { FCode: "ChucVu", FName: "Chức vụ hiện tại" },
        { FCode: "ChucVuKT", FName: "Chức vụ khen thưởng" },
        { FCode: "NoiDung1", FName: "Thời gian giữ chức vụ" },
        { FCode: "NoiDung2", FName: "Thời gian chuyển phục vụ kháng chiến" },
        { FCode: "NoiDung3", FName: "Nội dung 3" },
        { FCode: "KyLuat", FName: "Kỷ luật" },
        { FCode: "GhiChu", FName: "Ghi chú" },
        { FCode: "ThongTinBS1", FName: "Thông tin BS1" },
        { FCode: "NoiDungBS1", FName: "Nội dung BS1" },
        { FCode: "ThongTinBS2", FName: "Thông tin BS2" },
        { FCode: "NoiDungBS2", FName: "Nội dung BS2" },
        { FCode: "ThongTinBS3", FName: "Thông tin BS3" },
        { FCode: "NoiDungBS3", FName: "Nội dung BS3" },
        { FCode: "ThongTinBS4", FName: "Thông tin BS4" },
        { FCode: "NoiDungBS4", FName: "Nội dung BS4" },
        { FCode: "ThongTinBS5", FName: "Thông tin BS5" },
        { FCode: "NoiDungBS5", FName: "Nội dung BS5" },
        ]
        //$rootScope.ItemSidebar  = {
        //    tkh: '',
        //    dckh: '',
        //    dxcd: '',
        //    khcd: '',
        //    khdd: '',
        //    cntt: '',
        //    xlstt: '',
        //    tbmt: '',
        //    tbdg: '',
        //    tbdn:''
        //}
        //$http({
        //    method: 'GET',
        //    url: '/api/CountItemSidebar',
        //}).then(function successCallback(response) {
        //    $rootScope.ItemSidebar = response.data;
        //}, function errorCallback(response) {

        //});


        $rootScope.$settings.layout.pageContentWhite = true;
        $rootScope.$settings.layout.pageBodySolid = false;
        $rootScope.$settings.layout.pageSidebarClosed = false;
        $http({
            method: 'POST',
            url: '/api/getMenuByUser',
        }).then(function successCallback(response) {
            $rootScope.menu = response.data;
            //console.log($rootScope.menu);
            angular.forEach($rootScope.menu, function (value, key) {

                $stateProviderRef.state(value.FCode, {
                    url: "/" + value.FCode,
                    templateProvider: function ($templateRequest, $stateParams) {

                        if ($stateParams.param == null) $stateParams.param = value;
                        var fiename = value.Url;
                        var templateName = "views-client/template/" + fiename + "?bust=" + Math.random().toString(36).slice(2);
                        return $templateRequest(templateName);
                    },

                    params: {
                        param: null,

                    },
                    data: {
                        pageTitle: 'PHẦN MỀM QUẢN LÝ THI ĐUA KHEN THƯỞNG'
                    },
                    controllerProvider: ['$stateParams', function ($stateParams) {
                        var controller = '';
                        var arr = value.ControllerName.split('/');
                        if (arr.length > 1) controller = arr[arr.length - 1]; else controller = value.ControllerName;
                        return controller;
                    }],
                    resolve: {

                        deps: ['$ocLazyLoad', '$stateParams', function ($ocLazyLoad, $stateParams) {
                            return $ocLazyLoad.load({
                                name: 'WebApiApp',
                                insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                                files: [
                                    '../assets/global/plugins/morris/morris.css',
                                    '../assets/global/plugins/morris/morris.min.js',
                                    '../assets/global/plugins/morris/raphael-min.js',
                                    '../assets/global/plugins/jquery.sparkline.min.js',
                                    'js/controllers/' + value.ControllerName + '.js?bust=' + Math.random().toString(36).slice(2)
                                ]
                            });
                        }],

                    }
                })
            });


            $urlRouter.sync();
            $urlRouter.listen();

        }, function errorCallback(response) {

        });

    }]);
