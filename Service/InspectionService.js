var module = angular.module('WebApiApp');
module.factory('InspectionService', ['$http', function ($http) {
    var factory = {};
    
    factory.GetInspection = function (Paging, FPlan, success, error) {
      //  console.log(Paging);
       // console.log(FPlan);
        if (Paging.Year == '') Paging.Year = new Date().getFullYear();
        if (Paging.currentPage == 0 || Paging.currentPage > Paging.totalPage || Paging.currentPage == '')
            Paging.currentPage = 1;
        $http({
            method: 'GET',
            url: '/api/Inspections/GetAllInspections',
                //    ?pageNumber=' + Paging.currentPage
                //+ '&pageSize=' + Paging.pageSize
                //+ '&searchKey=' + Paging.searchKey
                //+ '&Year=' + Paging.Year
                //+ '&statusSend=' + Paging.Send
                //+ '&BranhCode=' + Paging.BranhCode
                //+ '&approve=' + Paging.Approve
                //+ '&FPlan=' + FPlan,  
                //+ '&Type=' + Paging.Type
            params: {
                pageNumber: Paging.currentPage,
                pageSize: Paging.pageSize,
                searchKey: Paging.searchKey,
                Year: Paging.Year,
                statusSend: Paging.Send,
                BranhCode: Paging.BranhCode,
                approve: Paging.Approve,
                FPlan: FPlan,  
                Type: Paging.Type

            }
        }).then(function successCallback(response) {
            return success(response.data);
            
        }, function errorCallback(response) {
            return error(response.data);
        });
    }
    factory.LoadListALLObjByInspection = function (FInspection, year, success, error) {
       
            $http({
                method: 'GET',
                url: '/api/Inspections/GetALLObjectByInspections?F_inspection=' + FInspection + '&year=' + year
            }).then(function successCallback(response) {
                return success(response.data);
            }, function errorCallback() {
                return error();
            });
        

    }
    factory.GetAutoID =  function (Code, success, error) {

        $http({
            method: 'POST',
            url: '/AutoId/' + Code
        }).then(function successCallback(response) {
            return success(response.data);
        }, function errorCallback(response) {
            return error(response.data);
        });
    }
    
    /// Service ObjByInspection
    factory.GetObjByInspection = function (Paging, success, error) {
     
        if (Paging.Year == '') Paging.Year = new Date().getFullYear();
        if (Paging.currentPage == 0 || Paging.currentPage > Paging.totalPage || Paging.currentPage == '')
            Paging.currentPage = 1;
        $http({
            method: 'GET',
            url: '/api/ObjectByInspections/ObjByInspection_Year',//?pageNumber=' + Paging.currentPage
                //+ '&pageSize=' + Paging.pageSize
                //+ '&searchKey=' + Paging.searchKey
                //+ '&Year=' + Paging.Year
                //+ '&statusSend=' + Paging.Send
                //+ '&BranhCode=' + Paging.BranhCode
                //+ '&approve=' + Paging.Approve
                //+ '&FPlan=' + FPlan
            params: {
                pageNumber: Paging.currentPage,
                pageSize: Paging.pageSize,
                Year: Paging.Year,
                BranhCode: Paging.BranhCode,
                SearchKey: Paging.searchKey

            }
        }).then(function successCallback(response) {
            return success(response.data);

        }, function errorCallback(response) {
            return error(response.data);
        });
    }
    factory.LoadItemAddListObjectByInspect = function (fobjInspec, fInspec, year, type, success) 
        {

            $http({
                method: 'GET',
                url: '/api/ObjectInspects/ListObjectInspect',///' + FobjInspec + '/' + FInspec + '/' + Year
                params: {
                    FobjInspec: fobjInspec,
                    FInspec: fInspec,
                    Year: year,
                    Type: type
                }
            }).then(function successCallback(response) {
                return success(response.data);
            }, function errorCallback() {
                toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
                return;
            });
        }
    factory.GetDetailInspec = function (obj, success, error) {
        $http({
            method: 'POST',
            url: '/api/Inspections/GetDetailInspec',
            data: obj
        }).then(function successCallback(response) {

            return success(response.data);

        }, function errorCallback(response) {
            return error(response.data);
        });
    }
    factory.CreateChangeInsspection = function (plan, success, error) {
        $http({
            method: 'POST',
            url: '/api/Inspections/CreateInspectionBS',
            data:plan
        }).then(function successCallback(response) {
            return success(response.data);

        }, function errorCallback(response) {
            return error(response.data);
        });
    }
    factory.CreateChangeInsspection = function (Paging,plan, success, error) {
        $http({
            method: 'POST',
            url: '/api/Inspections/CreateInspectionBS',
            data: plan,
            params: {
                pageNumber: Paging.currentPage,
                pageSize: Paging.pageSize,
                searchKey: Paging.searchKey,
                Year: Paging.Year,
                statusSend: Paging.Send,
                BranhCode: Paging.BranhCode,
                approve: Paging.Approve,
                FPlan: plan.FCode,
                Type: Paging.Type

            }
        }).then(function successCallback(response) {
            return success(response.data);

        }, function errorCallback(response) {
            return error(response.data);
        });
    }
    factory.LoadChangeInsspection = function (Paging, FPlan, success, error) {
        $http({
            method: 'GET',
            url: '/api/Inspections/InspectionBS',
           // data: plan,
            params: {
                pageNumber: Paging.currentPage,
                pageSize: Paging.pageSize,
                searchKey: Paging.searchKey,
                Year: Paging.Year,
                statusSend: Paging.Send,
                BranhCode: Paging.BranhCode,
                approve: Paging.Approve,
                FPlan: FPlan,
                Type: Paging.Type

            }
        }).then(function successCallback(response) {
            return success(response.data);

        }, function errorCallback(response) {
            return error(response.data);
        });
    }
    return factory;
}]);

