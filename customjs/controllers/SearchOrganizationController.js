angular.module('WebApiApp').controller("ModalLoadDiaryHandlerController", function ($filter, $rootScope, $scope, $http, $uibModal, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
   // console.log($scope.item);
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
});
angular.module('WebApiApp').controller("ModalLoadDocumentHandlerController", function ($filter, $rootScope, $scope, $http, $uibModal, $uibModalInstance) {
    $scope.Type = $scope.$resolve.Type;
    $scope.FInspection = $scope.$resolve.FInspection;
    $scope.FObj = $scope.$resolve.FObj;
    $scope.nameModal = $scope.$resolve.name;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
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
    $scope.Paging.pageSize = $scope.displayPage[0].value;
    $scope.PrePage = function () {
        if ($scope.Paging.currentPage > 1) {
            $scope.Paging.currentPage = $scope.Paging.currentPage - 1;
            $scope.LoadDocAll();
        }

    }
    $scope.NextPage = function () {
        if ($scope.Paging.currentPage < $scope.Paging.totalPage) {
            $scope.Paging.currentPage = $scope.Paging.currentPage + 1;
            if ($scope.Paging.currentPage == $scope.Paging.totalPage) {
                $scope.Paging.currentPage == $scope.Paging.totalPage
            }
            $scope.LoadDocAll();
        }

    }
    $scope.LoadDocAll = function () {
        //console.log($scope.Type, $scope.FInspection, $scope.FObj);
        $rootScope.Loading = true;
        $http({
            method: 'GET',
            url: '/api/SearchInspection/GetDocumentAll',
            params: { pageNumber: $scope.Paging.currentPage, pageSize: $scope.Paging.pageSize, Type: $scope.Type, FInspection: $scope.FInspection, FObj: $scope.FObj }
        }).then(function successCallback(response) {

            $scope.DocAll = response.data.SearchDoc;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.pageEnd = response.data.pageEnd;
            $scope.Paging.totalPage = response.data.totalPage;
            //console.log($scope.DocAll);
            //$scope.openModalDsDntclq($scope.DocAll);
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });

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
        $scope.LoadDocAll();
    }
    $scope.ListShowDoc = '';
    $scope.ShowDocLq = function (Doc) {
        //console.log(Doc.Id);
        $http({
            method: 'GET',
            url: '/api/SearchDocument/GetVBLQ',
            params: {
                DocID: Doc.Id,
            }
        }).then(function successCallback(response) {

            Doc.Doclq = response.data;


        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });

        $scope.ListShowDoc = $scope.ListShowDoc + ';' + Doc.Id + ';';
    }
    $scope.HideDocLq = function (Doc) {
        $scope.ListShowDoc = $scope.ListShowDoc.replace(';' + Doc.Id + ';', '');

    }

});
angular.module('WebApiApp').controller("ModalSearchInspectionHandlerController", function ($filter, $rootScope, $scope, $http, $uibModal, $uibModalInstance, InspectionService) {
    $scope.item = $scope.$resolve.item;
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
        $scope.LoadDiarybyInspection();
    }
    $scope.LoadDiarybyInspection = function () {
        $http({
            method: 'GET',
            url: 'api/DiaryByInspections',
            params: { f_ins: $scope.item.FCode }
        }).then(function successCallback(response) {

            $scope.Diary = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.LoadObj = function (obj) {
        $http({
            method: 'GET',
            url: 'api/SearchInspection/GetOBJ',
            params: { FObj: obj.F_Obj }
        }).then(function successCallback(response) {

            obj.ObjDetail = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.openModalDiaryDetail = function (item) {

        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/ModalDiaryDetail.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModalLoadDiaryHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                item: function () { return item },
            }
        });

    }
    $scope.openModalDsDntclq = function (Type, FInspection, FObj, name) {

        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/ModalDsDntclq.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModalLoadDocumentHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                Type: function () { return Type },
                FInspection: function () { return FInspection },
                FObj: function () { return FObj },
                name: function () { return name }
            }
        });

    }

    $scope.LoadObjbyInspection = function (inspection) {
        InspectionService.LoadListALLObjByInspection(inspection.FCode, inspection.Year, function (data) {
            $scope.ListObjectByInspect = data.ListObjectByInspect;
           // console.log($scope.ListObjectByInspect);
        }, function (data) { toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo'); });
        //$rootScope.Loading = true;
        //$http({
        //    method: 'GET',
        //    url: '/api/SearchInspection/GetObjbyInspection',
        //    params: { FInspection: Finspection }
        //}).then(function successCallback(response) {

        //    $scope.Obj = response.data;

        //}, function errorCallback(response) {
        //    toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        //});
    }
    $scope.LoadMemberbyInspection = function (Finspection) {
        $rootScope.Loading = true;
        $http({
            method: 'GET',
            url: '/api/SearchInspection/GetInspectionMember',
            params: { FInspection: Finspection }
        }).then(function successCallback(response) {

            $scope.Mem = response.data;
            //console.log($scope.Mem);
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.openModalProject = function (item) {
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/ModalProjectInspection.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelSearchOrganizationHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                item: function () { return item }
            }
        });

    };

    $scope.LoadObjbyInspection($scope.item);
    $scope.LoadMemberbyInspection($scope.item.FCode)
});
angular.module('WebApiApp').controller("ModelInspectOrgHandlerController", function ($filter, $rootScope, $scope, $http, $uibModalInstance, $uibModal, InspectionService) {
    $scope.item = $scope.$resolve.item;
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
        $scope.LoadDiarybyInspection();
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
    $scope.Paging.pageSize = $scope.displayPage[0].value;
    $scope.PrePage = function () {
        if ($scope.Paging.currentPage > 1) {
            $scope.Paging.currentPage = $scope.Paging.currentPage - 1;
            $scope.ShowDoc($scope.item);
        }
    }
    $scope.NextPage = function () {
        if ($scope.Paging.currentPage < $scope.Paging.totalPage) {
            $scope.Paging.currentPage = $scope.Paging.currentPage + 1;
            if ($scope.Paging.currentPage == $scope.Paging.totalPage) {
                $scope.Paging.currentPage == $scope.Paging.totalPage
            }
            $scope.ShowDoc($scope.item);
        }
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
    //$scope.ListShowObject = '';
    //$scope.ListShowObject1 = '';
    $scope.ShowDoc = function (CodeIns) {
       // console.log(CodeIns.FCode);
        $http({
            method: 'GET',
            url: '/api/SearchDocument',
            params: {
                pageNumber: $scope.Paging.currentPage, pageSize: $scope.Paging.pageSize,
                searchKey: '',
                searchKeyDoc: '',
                Year: '',
                type:'',
                ObjIns: CodeIns.obj_Ins,
                CodeIns: CodeIns.FCode,

            }
        }).then(function successCallback(response) {

            CodeIns.Docs = response.data.SearchDocument;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.pageEnd = response.data.pageEnd;
            $scope.Paging.totalPage = response.data.totalPage;
            //console.log($scope.item.obj_Ins);
            //console.log(CodeIns.Docs);
            
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
        //$scope.ListShowObject = $scope.ListShowObject + ';' + CodeIns.FCode + ';';
        //$scope.ListShowObject1 = $scope.ListShowObject1 + ';' + CodeIns.obj_Ins + ';';
        //console.log($scope.ListShowObject);
        //console.log($scope.ListShowObject1);
    }
    //$scope.HideDoc = function (CodeIns) {
    //    $scope.ListShowFile = '';
    //    $scope.ListShowObject = $scope.ListShowObject.replace(';' + CodeIns.FCode + ';', '');
    //    $scope.ListShowObject1 = $scope.ListShowObject1.replace(';' + CodeIns.obj_Ins + ';', '');

    //    console.log($scope.ListShowObject);
    //    console.log($scope.ListShowObject1);
    //}
    //$scope.ListShowFile = '';
    $scope.LoadFile = function (a) {
        $http({
            method: 'GET',
            url: '/api/SearchDocument/GetVBLQ',
            params: {
                docid: a.Id,
            }
        }).then(function successCallback(response) {
            a.Files = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
        //$scope.ListShowFile = $scope.ListShowFile + ';' + a.Id + ';';
        //console.log($scope.ListShowFile);
    }
    //$scope.HideFile = function (a) {
    //    $scope.ListShowFile = $scope.ListShowFile.replace(';' + a.Id + ';', '');
    //    console.log($scope.ListShowFile);
    //}
});
angular.module('WebApiApp').controller("ModelSearchOrganizationHandlerController", ['$rootScope', '$scope', '$http', '$uibModal', '$uibModalInstance', function ($rootScope, $scope, $http, $uibModal, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
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
    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "pageStart": 0,
        "pageEnd": 0,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Paging.pageSize = $scope.displayPage[0].value;
    $scope.PrePage = function () {
        if ($scope.Paging.currentPage > 1) {
            $scope.Paging.currentPage = $scope.Paging.currentPage - 1;
            $scope.LoadObjByInspection($scope.item);
        }
    }
    $scope.NextPage = function () {
        if ($scope.Paging.currentPage < $scope.Paging.totalPage) {
            $scope.Paging.currentPage = $scope.Paging.currentPage + 1;
            if ($scope.Paging.currentPage == $scope.Paging.totalPage) {
                $scope.Paging.currentPage == $scope.Paging.totalPage
            }
            $scope.LoadObjByInspection($scope.item);
        }
    }
    $scope.searchObjByInspection = {
        Key: '',
        Bien0: '',
        
        Bien2: '',
    }
    $scope.LoadObjByInspection = function (a) {
        $rootScope.Loading = true;
        $http({
            method: 'GET',
            url: '/api/SearchObjByInspection/GetObjByInspection',
            params: {
                pageNumber: $scope.Paging.currentPage, pageSize: $scope.Paging.pageSize, searchKey: $scope.searchObjByInspection.Key
                , FCodeOBJ: a.FCode, Bien0: $scope.searchObjByInspection.Bien0, Bien1: '', Bien2: $scope.searchObjByInspection.Bien2
            }
        }).then(function successCallback(response) {
            $scope.ObjByInspection = response.data.ObjByInspection;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.pageEnd = response.data.pageEnd;
            $scope.Paging.totalPage = response.data.totalPage;
            $rootScope.Loading = false;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.openModalInspectionDetails = function (item) {

        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/ModalInspectionDetails.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModalSearchInspectionHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                item: function () { return item }
            }
        });
        //$scope.LoadObjByInspection(item);
    };
    $scope.OpenDoc = function (item) {

        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/ModalDocObj.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelInspectOrgHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                item: function () { return item }
            }
        });
    };
    $scope.LoadInpectionV2 = function (ins) {

        $http({
            method: 'GET',
            url: 'api/SearchInspection/GetInspectionV2?FCode=' + ins.FCode
        }).then(function successCallback(response) {
            ins.ListInspections = response.data.ListobjInspection;
            // console.log(ins.ListInspections)
            $scope.GetStatusInspect_Inspection(ins.ListInspections[0]);
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu Inspections!', 'Thông báo');
        });
    }
    function getMinProgress(data) {
        //debugger
        var min = Math.min.apply(Math, data);
        return min;
    }
    function checkInspectCompleted(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i] !== "100")
                return false;
        }

        return true;
    }
    function getLatestDate(data) {
        // convert to timestamp and sort
        var sorted_ms = data.map(function (item) {
            return new Date(item).getTime()
        }).sort();
        // take latest
        var latest_ms = sorted_ms[sorted_ms.length - 1];
        // convert to js date object 
        return new Date(latest_ms);
    }
    $scope.GetStatusInspect_Inspection = function (item) {

        //console.log(list.length);
        // angular.forEach(list, function (item) {
        item.status = '';
        item.class = '';

        var check_ListObjectByInspect = "0";
        //console.log(item.listObj)
        if (item.listObj.length > 0) {
            for (var i = 0; i < item.listObj.length; i++) {
                if (item.listObj[i].NgayBatDau != null) {
                    check_ListObjectByInspect = "1";
                    break;
                }
            }
        }

        var currDate = new Date();
        var arr = [];
        var progress = [];

        for (var i = 0; i < item.listObj.length; i++) {
            if (item.listObj[i].NgayKetThuc != null) {
                arr.push(item.listObj[i].NgayKetThuc);
                progress.push(item.listObj[i].Progress);
            }
        }

        var minProgress = getMinProgress(progress);
        var maxDate = getLatestDate(arr);
        if (currDate > maxDate && minProgress != 100) {
            check_ListObjectByInspect = "2";
        }
        var compleled = checkInspectCompleted(progress);
        if (compleled == true && currDate >= maxDate) {
            check_ListObjectByInspect = "3";

        }
        if (check_ListObjectByInspect == "0") {
            {
                item.status = 'Chưa bắt đầu';
                item.class = 'label-default';
            }

        }
        if (check_ListObjectByInspect == "1") {
            {
                item.status = 'Đang tiến hành';
                item.class = 'label-primary';
            }
        }
        if (check_ListObjectByInspect == "2") {
            {
                item.status = 'Sau thanh tra';
                item.class = 'label-danger';
            }
        }
        if (check_ListObjectByInspect == "3") {
            {
                item.status = 'Hoàn thành';
                item.class = 'label-success';
            }
        }
        //console.log(item);
        //});


    }
    
    $scope.LoadObjectInspection = function () {

        //$rootScope.Loading = true;
        $http({
            method: 'GET',
            url: 'api/SearchObjectInspect/GetObjectInspect',
            params: {
                pageNumber: '1',
                pageSize: '9999',
                TypeDb: '',
                Value: '',
                DTTT: '',
                searchKey: '',

                Bien1: $scope.item.objectByInspect.F_Obj_Inspection,
                Bien2: ''
            }
        }).then(function successCallback(response) {

            $scope.item.Obi = response.data.SearchObjectInspect;
            //console.log($scope.item.Obi);
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $scope.LoadProjectInspection = function () {

        //$rootScope.Loading = true;
        $http({
            method: 'GET',
            url: '/api/SearchProjectInspection/GetProjectInspection',
            params: {
                pageNumber: '1',
                pageSize: '9999',
                TypeDb: '',
                Value: '0',
                Org: '',
                searchKey: '',

                bien2: $scope.item.objectByInspect.F_Obj_Inspection
            }
        }).then(function successCallback(response) {

            $scope.item.Pros = response.data.SearchProjectInspections;
           // console.log($scope.item.Pros);
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.Ins = '';
    $scope.LoadInspectionbyProject = function () {
        $http({
            method: 'GET',
            url: '/api/SearchProjectInspection/GetInspectionbyProject',
            params: {
                pageNumber: $scope.Paging.currentPage,
                pageSize: $scope.Paging.pageSize,
                FPro_inspection: $scope.item.objectByInspect.F_Obj_Inspection
            }
        }).then(function successCallback(response) {

            $scope.Ins = response.data.GetInspectionsByProject;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.pageEnd = response.data.pageEnd;
            $scope.Paging.totalPage = response.data.totalPage;
          //  console.log($scope.Ins)
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.openModalInspectionDetails = function (item) {

        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/ModalInspectionDetails.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModalSearchInspectionHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                item: function () { return item }
            }
        });

    }
}]);
angular.module('WebApiApp').controller('SearchOrganizationController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "pageStart": 0,
        "pageEnd": 0,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
   
    $scope.Paging.pageSize = $scope.displayPage[0].value;
    $scope.FisrtPage = function () {
        if ($scope.Paging.currentPage > 1) {
            $scope.Paging.currentPage = 1;
            $scope.LoadOrganization();
        }
    }
    $scope.EndPage = function () {
        if ($scope.Paging.currentPage < $scope.Paging.totalPage) {
            $scope.Paging.currentPage = $scope.Paging.totalPage;
            $scope.LoadOrganization();
        }
    }
    $scope.PrePage = function () {
        if ($scope.Paging.currentPage > 1) {
            $scope.Paging.currentPage = $scope.Paging.currentPage - 1;
            $scope.LoadOrganization();
        }

    }
    $scope.NextPage = function () {
        if ($scope.Paging.currentPage < $scope.Paging.totalPage) {
            $scope.Paging.currentPage = $scope.Paging.currentPage + 1;
            if ($scope.Paging.currentPage == $scope.Paging.totalPage) {
                $scope.Paging.currentPage == $scope.Paging.totalPage
            }
            $scope.LoadOrganization();
        }

    }
    $scope.search = {
        Key: '',
        TypeDb: '',
        Value: '',
       
        Bien1: '',
        Bien2: '',
      
       
    }
    $scope.search.TypeDb = 'TINH';
    $scope.search.Value = '0';
    $scope.Clear = function () {
        
        $scope.IDDistrict = [];
        $scope.IDWard = [];

    }
    $scope.ClearXa = function () {
        $scope.IDWard = [];

    }
    $scope.IDProvin = '35';
    $scope.IDDistrict = '0'
    $scope.IDWard = '0';
    $scope.ProvinChange = function (ProvinId, DistrictId, WardId) {
      //  console.log(ProvinId);
        //$scope.Ward = [];
      
        $scope.LoadProvin(ProvinId, DistrictId, WardId);
        if (DistrictId == "0" && WardId == "0") {
            $scope.search.TypeDb = 'TINH'
            $scope.search.Value = ProvinId;
            // $scope.Ward = [{}];
        }
        else if (DistrictId != "0" && WardId == "0") {
            $scope.search.TypeDb = 'HUYEN'
            $scope.search.Value = DistrictId;
        }
        else if (WardId != "0") {
            $scope.search.TypeDb = 'XA'
            $scope.search.Value = WardId;
        }
        $scope.LoadOrganization();
       // console.log($scope.search.TypeDb);
        //console.log($scope.search.Value);


    }

    $scope.ClearCo = function () {
        $scope.IDDistrict = [];
        $scope.IDWard = [];
    }
    //$scope.Clear = function () {
    //    $scope.search.XA = '0';
    //    $scope.search.HUYEN = '0';
    //    $scope.search.TypeDb = '';
    //    $scope.search.Value = '0';
    //}
    //$scope.ClearXa = function () {
    //    $scope.search.XA = '0';
    //    $scope.search.TypeDb = 'HUYEN';
    //}
    $scope.LoadOrganization = function () {

        //if (($scope.search.XA == '0' && $scope.search.HUYEN == '0')) {
        //    $scope.search.TypeDb = 'TINH';
        //    $scope.search.Value = $scope.search.TINH;
        //}
        //else if (($scope.search.HUYEN != '0' && $scope.search.XA == '0')) {
        //    $scope.search.TypeDb = 'HUYEN';
        //    $scope.search.Value = $scope.search.HUYEN;
        //}
        //else if ($scope.search.XA != '0') {
        //    $scope.search.TypeDb = 'XA';
        //    $scope.search.Value = $scope.search.XA;
        //}
        //console.log($scope.search.TypeDb);
        //console.log($scope.search.Value);
        //console.log($scope.search.TINH);
        //console.log($scope.search.HUYEN);
        //console.log($scope.search.XA);

        if ($scope.Paging.currentPage == '') return;
        if ($scope.Paging.currentPage == 0 || $scope.Paging.currentPage > $scope.Paging.totalPage)
            $scope.Paging.currentPage = 1;
        $rootScope.Loading = true;
        $http({
            method: 'GET',
            url: '/api/SearchOrganization/GetOrganization',
            params: {
                pageNumber: $scope.Paging.currentPage, pageSize: $scope.Paging.pageSize, searchKey: $scope.search.Key
                , TypeDb: $scope.search.TypeDb, Value: $scope.search.Value,
                 Bien1: $scope.search.Bien1, Bien2: $scope.search.Bien2
            }
        }).then(function successCallback(response) {
            $scope.SearchOrganization = response.data.SearchOrganization;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.pageEnd = response.data.pageEnd;
            $scope.Paging.totalPage = response.data.totalPage;
            //console.log($scope.SearchOrganization);
            $rootScope.Loading = false;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.openModalDsTtLq = function (item) {

        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/ModalObjIns.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelSearchOrganizationHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                item: function () { return item }
            }
        });
        //$scope.LoadObjByInspection(item);
    };
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        //App.initAjax();
        //// set default layout mode
        //$rootScope.$settings.layout.pageContentWhite = true;
        //$rootScope.$settings.layout.pageBodySolid = false;
        //$rootScope.$settings.layout.pageSidebarClosed = true;
        // Simple GET request example:
        ComponentsSelect2.init();
        //$scope.LoadOrganization();
        $scope.LoadProvin("0", "0", "0");
        $scope.ProvinChange($scope.IDProvin, "0", "0");
        //$scope.LoadProvin($scope.search.TINH, $scope.search.HUYEN, $scope.search.XA);
    });
}]);