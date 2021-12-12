angular.module('WebApiApp').controller('BaoCaoNamController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {
    $scope.checkAllDv = true;
    $scope.OrgKlHC = 'ALL';
   
    $scope.checkallnew = function () {
        $scope.searchTextDVBCN = '';
        $("#searchDVBCN").focus();
        if ($scope.OrgKlHC.length != $scope.Org.length) {
            $scope.OrgKlHC = 'ALL';
            angular.forEach($scope.Org, function (value, key) {
                //  $scope.OrgKlHC.push(value.FCode);
                value.check = false;
            })
            console.log($scope.OrgKlHC);
        }
        $scope.checkAllDv = true;
        console.log($scope.OrgKlHC);
    }

    $scope.checkHC = function (a) {
       
        console.log($scope.OrgKlHC)
        $scope.searchTextDVBCN = '';
        $("#searchDVBCN").focus();
        if ($scope.checkAllDv == true) {
            $scope.OrgKlHC = [];
        }
        var i = $scope.OrgKlHC.findIndex(record => record === a.FCode);
        if (i === -1) {
            $scope.OrgKlHC.push(a.FCode);
        } else {
            $scope.OrgKlHC.splice(i, 1);
        }
        console.log($scope.OrgKlHC);
        if ($scope.OrgKlHC.length == $scope.Org.length) {
            $scope.checkAllDv = true;
        }
        else if ($scope.OrgKlHC.length == 0) {
            $scope.OrgKlHC = [];
            angular.forEach($scope.Org, function (value, key) {
                $scope.OrgKlHC.push(value.FCode);
            })
            console.log($scope.OrgKlHC);
            $scope.checkAllDv = true;
        } else
            $scope.checkAllDv = false;
        console.log($scope.OrgKlHC);
    }
    $scope.checkAllHt = true;
    $scope.searchHT = 'ALL';
    $scope.checkallnew1 = function () {
        $scope.searchTextHTBCN = '';
        $("#searchHTBCN").focus();
        if ($scope.searchHT.length != $scope.BCHT.length) {
            $scope.searchHT = 'ALL';
            angular.forEach($scope.BCHT, function (value, key) {
                //  $scope.OrgKlHC.push(value.FCode);
                value.check = false;
            })
            //  console.log($scope.OrgKlHC);
        }
        $scope.checkAllHt = true;
        console.log($scope.searchHT);
    }
    $scope.checkHC1 = function (a) {
        // console.log($scope.OrgKlHC)
        $scope.searchTextHTBCN = '';
        $("#searchHTBCN").focus();
        if ($scope.checkAllHt == true) {
            $scope.searchHT = [];
        }
        var i = $scope.searchHT.findIndex(record => record === a.FCode);
        if (i === -1) {
            $scope.searchHT.push(a.FCode);
        } else {
            $scope.searchHT.splice(i, 1);
        }
        //   console.log($scope.OrgKlHC);
        if ($scope.searchHT.length == $scope.BCHT.length) {
            $scope.checkAllHt = true;
        }
        else if ($scope.searchHT.length == 0) {
            $scope.searchHT = [];
            angular.forEach($scope.BCHT, function (value, key) {
                $scope.searchHT.push(value.FCode);
            })
            console.log($scope.searchHT);
            $scope.checkAllHt = true;
        } else
            $scope.checkAllHt = false;
        console.log($scope.searchHT);
    }
    $scope.checkAllDh = true;
    $scope.searchDH = 'ALL';
    $scope.checkallnew3 = function () {
        $scope.searchTextHT1 = '';
        $("#search1").focus();
        if ($scope.searchDH.length != $scope.BCDH.length) {
            $scope.searchDH = 'ALL';
            angular.forEach($scope.BCDH, function (value, key) {
                //  $scope.OrgKlHC.push(value.FCode);
                value.check = false;
            })
            //  console.log($scope.OrgKlHC);
        }
        $scope.checkAllDh = true;
        console.log($scope.searchDH1);
    }
    $scope.checkHC3 = function (a) {
        // console.log($scope.OrgKlHC)
        $scope.searchTextDH = '';
        $("#searchDH").focus();
        if ($scope.checkAllDh == true) {
            $scope.searchDH = [];
        }
        var i = $scope.searchDH.findIndex(record => record === a.FCode);
        if (i === -1) {
            $scope.searchDH.push(a.FCode);
        } else {
            $scope.searchDH.splice(i, 1);
        }
        //   console.log($scope.OrgKlHC);
        if ($scope.searchDH.length == $scope.BCDH.length) {
            $scope.checkAllDh = true;
        }
        else if ($scope.searchDH.length == 0) {
            $scope.searchDH = [];
            angular.forEach($scope.BCDH, function (value, key) {
                $scope.searchDH.push(value.FCode);
            })
            console.log($scope.searchDH);
            $scope.checkAllDh = true;
        } else
            $scope.checkAllDh = false;
        console.log($scope.searchDH);
    }
    $scope.checkAllCQD = true;
    $scope.searchCQD = 'ALL';
    $scope.checkallCQD = function () {
        $scope.searchTextCQD = '';
        $("#searchCQD").focus();
        if ($scope.searchCQD.length != $scope.BCCQD.length) {
            $scope.searchCQD = 'ALL';
            angular.forEach($scope.BCCQD, function (value, key) {
                //  $scope.OrgKlHC.push(value.FCode);
                value.check = false;
            })
            //  console.log($scope.OrgKlHC);
        }
        $scope.checkAllCQD = true;
        console.log($scope.searchCQD);
    }
    $scope.checkCQD = function (a) {
        // console.log($scope.OrgKlHC)
        $scope.searchTextCQD = '';
        $("#searchCQD").focus();
        if ($scope.checkAllCQD == true) {
            $scope.searchCQD = [];
        }
        var i = $scope.searchCQD.findIndex(record => record === a.FCode);
        if (i === -1) {
            $scope.searchCQD.push(a.FCode);
        } else {
            $scope.searchCQD.splice(i, 1);
        }
        //   console.log($scope.OrgKlHC);
        if ($scope.searchCQD.length == $scope.BCCQD.length) {
            angular.forEach($scope.BCCQD, function (value, key) {
                value.check=false;
            })
            $scope.searchCQD='ALL';
            $scope.checkAllCQD = true;
        }
        else if ($scope.searchCQD.length == 0) {
            $scope.searchCQD = [];
            angular.forEach($scope.BCCQD, function (value, key) {
                $scope.searchCQD.push(value.FCode);
            })
            console.log($scope.searchCQD);
            $scope.checkAllCQD = true;
        } else
            $scope.checkAllCQD = false;
        console.log($scope.searchCQD);
    }
    $scope.LoadData = function () {
   
        var ListTT = '';
        var ListCN = '';
      
        if ($scope.CheckAllCN == null|| $scope.CheckAllCN == false) {
            if ($scope.DsCNSelect != null) {
                ListCN = '#';
                angular.forEach($scope.DsCNSelect, function (it) { ListCN += it.Code +'#'; } );
            }
        } else ListCN = 'ALLCN';
        if ($scope.CheckAllTT == null || $scope.CheckAllTT == false) {
            ListTT = '#';
            if ($scope.DsTTSelect != null) {
                angular.forEach($scope.DsTTSelect, function (it) { ListTT += it.Code + '#'; });
            }
        } else ListTT = 'ALLTT';
        if ($scope.CheckAllTT == true && $scope.CheckAllCN == true) ListCN = 'ALL';
        else ListCN += ListTT;
        if($scope.OrgKlHC!="ALL")
            $scope.SearchDvi=JSON.stringify($scope.OrgKlHC);
        else $scope.SearchDvi=$scope.OrgKlHC
        if($scope.searchHT!="ALL")
            $scope.SearchsearchHT=JSON.stringify($scope.searchHT);
        else $scope.SearchsearchHT=$scope.searchHT
        if($scope.searchDH!="ALL")
            $scope.SearchsearchDH=JSON.stringify($scope.searchDH);
        else $scope.SearchsearchDH=$scope.searchDH
        if($scope.searchCQD!="ALL")
            $scope.SearchsearchCQD=JSON.stringify($scope.searchCQD);
        else $scope.SearchsearchCQD=$scope.searchCQD
        $http({
            method: 'GET',
            url: '/api/ReportTDKT/BaoCaoNam',
            params: {
                pageNumber: '1',
                pageSize: '900000000',//900000000
                Nam: $scope.itemNam,
                DonVi:  $scope.SearchDvi,
                HinhThuc: $scope.SearchsearchHT,
                DsTapThe: ListTT,
                DsCaNhan: ListCN,
                Search: $scope.seachKey == null ? '' : $scope.seachKey,
                CapQd:$scope.SearchsearchCQD,
                DanhHieu:  $scope.SearchsearchDH   
            }
        }).then(function successCallback(response) {
            $scope.DataMguon = response.data;
            $scope.DataBC = $scope.DataMguon;//[];
            angular.forEach($scope.DataBC, function (item) {
                var ListObj = $scope.DataBC.filter(t => t.stt == item.stt && item.count == null );
                var sttarr = 1;
                angular.forEach(ListObj, function (it) {
                    it.count = ListObj.length;
                    it.sttitem = sttarr;
                    sttarr++;
                });
              
            });
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.$on('$viewContentLoaded', function () {
        $scope.DsCNSelect = [];
        $scope.DsTTSelect = [];
        $scope.DsCaNhan = [];
        $scope.DsTapThe = [];
        $scope.GetDsDonVi();
        $scope.LoadDsHinhThuc('0');
        $scope.LoadDsCapQd();
        $scope.LoadDsDanhHieu();
        if ($scope.itemNam == null) $scope.itemNam = 'ALL';
        if ($scope.itemHinhThuc == null) $scope.itemHinhThuc = 'ALL';
        if ($scope.itemDonVi == null) $scope.itemDonVi = 'ALL';

    });
}]);
angular.module('WebApiApp').controller('BaoCaoTongHopController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {
    $scope.checkAllDv = true;
    $scope.OrgKlHC = 'ALL';
   
    $scope.checkallnew = function () {
        $scope.searchTextHC = '';
        $("#searchHC").focus();
        if ($scope.OrgKlHC.length != $scope.Org.length) {
            $scope.OrgKlHC = 'ALL';
            angular.forEach($scope.Org, function (value, key) {
                //  $scope.OrgKlHC.push(value.FCode);
                value.check = false;
            })
            console.log($scope.OrgKlHC);
        }
        $scope.checkAllDv = true;
        console.log($scope.OrgKlHC);
    }

    $scope.checkHC = function (a) {
       
        console.log($scope.OrgKlHC)
        $scope.searchTextHC = '';
        $("#searchHC").focus();
        if ($scope.checkAllDv == true) {
            $scope.OrgKlHC = [];
        }
        var i = $scope.OrgKlHC.findIndex(record => record === a.FCode);
        if (i === -1) {
            $scope.OrgKlHC.push(a.FCode);
        } else {
            $scope.OrgKlHC.splice(i, 1);
        }
        console.log($scope.OrgKlHC);
        if ($scope.OrgKlHC.length == $scope.Org.length) {
            $scope.checkAllDv = true;
        }
        else if ($scope.OrgKlHC.length == 0) {
            $scope.OrgKlHC = [];
            angular.forEach($scope.Org, function (value, key) {
                $scope.OrgKlHC.push(value.FCode);
            })
            console.log($scope.OrgKlHC);
            $scope.checkAllDv = true;
        } else
            $scope.checkAllDv = false;
        console.log($scope.OrgKlHC);
    }
    $scope.checkAllDv1 = true;
    $scope.OrgKlHC1 = 'ALL';
   
    $scope.checkallnew2 = function () {
        $scope.searchTextHC1 = '';
        $("#searchHC1").focus();
        if ($scope.OrgKlHC1.length != $scope.Org1.length) {
            $scope.OrgKlHC1 = 'ALL';
            angular.forEach($scope.Org1, function (value, key) {
                //  $scope.OrgKlHC.push(value.FCode);
                value.check = false;
            })
            console.log($scope.OrgKlHC1);
        }
        $scope.checkAllDv1 = true;
        console.log($scope.OrgKlHC1);
    }
    $scope.checkHC2 = function (a) {
        console.log($scope.OrgKlHC1)
        $scope.searchTextHC1 = '';
        $("#searchHC1").focus();
        if ($scope.checkAllDv1 == true) {
            $scope.OrgKlHC1 = [];
        }
        var i = $scope.OrgKlHC1.findIndex(record => record === a.FCode);
        if (i === -1) {
            $scope.OrgKlHC1.push(a.FCode);
        } else {
            $scope.OrgKlHC1.splice(i, 1);
        }
        console.log($scope.OrgKlHC1);
        if ($scope.OrgKlHC1.length == $scope.Org1.length) {
            $scope.checkAllDv1 = true;
        }
        else if ($scope.OrgKlHC1.length == 0) {
            $scope.OrgKlHC1 = [];
            angular.forEach($scope.Org1, function (value, key) {
                $scope.OrgKlHC1.push(value.FCode);
            })
            console.log($scope.OrgKlHC1);
            $scope.checkAllDv1 = true;
        } else
            $scope.checkAllDv1 = false;
        console.log($scope.OrgKlHC1);
    }
    $scope.checkAllHt = true;
    $scope.searchHT = 'ALL';
    $scope.checkallnew1 = function () {
        $scope.searchTextHT = '';
        $("#search").focus();
        if ($scope.searchHT.length != $scope.BCHT.length) {
            $scope.searchHT = 'ALL';
            angular.forEach($scope.BCHT, function (value, key) {
                //  $scope.OrgKlHC.push(value.FCode);
                value.check = false;
            })
            //  console.log($scope.OrgKlHC);
        }
        $scope.checkAllHt = true;
        console.log($scope.searchHT);
    }
    $scope.checkHC1 = function (a) {
        // console.log($scope.OrgKlHC)
        $scope.searchTextHT = '';
        $("#search").focus();
        if ($scope.checkAllHt == true) {
            $scope.searchHT = [];
        }
        var i = $scope.searchHT.findIndex(record => record === a.FCode);
        if (i === -1) {
            $scope.searchHT.push(a.FCode);
        } else {
            $scope.searchHT.splice(i, 1);
        }
        //   console.log($scope.OrgKlHC);
        if ($scope.searchHT.length == $scope.BCHT.length) {
            $scope.checkAllHt = true;
        }
        else if ($scope.searchHT.length == 0) {
            $scope.searchHT = [];
            angular.forEach($scope.BCHT, function (value, key) {
                $scope.searchHT.push(value.FCode);
            })
            console.log($scope.searchHT);
            $scope.checkAllHt = true;
        } else
            $scope.checkAllHt = false;
        console.log($scope.searchHT);
    }
    $scope.checkAllDh = true;
    $scope.searchDH = 'ALL';
    $scope.checkallnew3 = function () {
        $scope.searchTextHT1 = '';
        $("#search1").focus();
        if ($scope.searchDH.length != $scope.BCDH.length) {
            $scope.searchDH = 'ALL';
            angular.forEach($scope.BCDH, function (value, key) {
                //  $scope.OrgKlHC.push(value.FCode);
                value.check = false;
            })
            //  console.log($scope.OrgKlHC);
        }
        $scope.checkAllDh = true;
        console.log($scope.searchDH1);
    }
    $scope.checkHC3 = function (a) {
        // console.log($scope.OrgKlHC)
        $scope.searchTextHT1 = '';
        $("#search1").focus();
        if ($scope.checkAllDh == true) {
            $scope.searchDH = [];
        }
        var i = $scope.searchDH.findIndex(record => record === a.FCode);
        if (i === -1) {
            $scope.searchDH.push(a.FCode);
        } else {
            $scope.searchDH.splice(i, 1);
        }
        //   console.log($scope.OrgKlHC);
        if ($scope.searchDH.length == $scope.BCDH.length) {
            $scope.checkAllDh = true;
        }
        else if ($scope.searchDH.length == 0) {
            $scope.searchDH = [];
            angular.forEach($scope.BCDH, function (value, key) {
                $scope.searchDH.push(value.FCode);
            })
            console.log($scope.searchDH);
            $scope.checkAllDh = true;
        } else
            $scope.checkAllDh = false;
        console.log($scope.searchDH);
    }
    $scope.LoadData = function (a) {
       
        if($scope.OrgKlHC!="ALL")
            $scope.SearchDvi=JSON.stringify($scope.OrgKlHC);
        else $scope.SearchDvi=$scope.OrgKlHC
        if($scope.searchHT!="ALL")
            $scope.SearchsearchHT=JSON.stringify($scope.searchHT);
        else $scope.SearchsearchHT=$scope.searchHT
      
        console.log($scope.SearchDvi);
        $http({
            method: 'GET',
            url: '/api/ReportTDKT/BaoCaoTongHop',
            params: {
                pageNumber: '1',
                pageSize: '900000000',//900000000
                Nam: $scope.itemNam,
                DonVi: $scope.SearchDvi,
                HinhThuc: $scope.SearchsearchHT,
                type:a
            }
        }).then(function successCallback(response) {
            $scope.DataBC = response.data;
            //$scope.DataBC1 = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadData1 = function (a) {
        
        if($scope.OrgKlHC1!="ALL")
            $scope.SearchDvi=JSON.stringify($scope.OrgKlHC1);
        else $scope.SearchDvi=$scope.OrgKlHC1
        if($scope.searchDH!="ALL")
            $scope.SearchsearchHT=JSON.stringify($scope.searchDH);
        else $scope.SearchsearchHT=$scope.searchDH
        
        console.log($scope.SearchDvi);
        $http({
            method: 'GET',
            url: '/api/ReportTDKT/BaoCaoTongHop',
            params: {
                pageNumber: '1',
                pageSize: '900000000',//900000000
                Nam: $scope.itemNam1,
                DonVi: $scope.SearchDvi,
                HinhThuc: $scope.SearchsearchHT,
                type:a
            }
        }).then(function successCallback(response) {
            $scope.DataBC1 = response.data;
            //$scope.DataBC1 = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadYearDH = function () {
        
        $http({
            method: 'GET',
            url: '/api/ReportTDKT/NamBCHT',
            params: {
                type:'DH'
            }
        }).then(function successCallback(response) {
            $scope.YearBc1 = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadYear = function () {
        
        $http({
            method: 'GET',
            url: '/api/ReportTDKT/NamBCHT',
            params: {
                type:'HT'
            }
        }).then(function successCallback(response) {
            $scope.YearBc = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.$on('$viewContentLoaded', function () {
        $scope.DsCNSelect = [];
        $scope.DsTTSelect = [];
        $scope.DsCaNhan = [];
        $scope.DsTapThe = [];
        $scope.GetDsDonVi();
        $scope.LoadYearDH();
        $scope.LoadYear();
        $scope.LoadDsHinhThuc('0');
        $scope.LoadDsDanhHieu();
        if ($scope.itemNam == null) $scope.itemNam = 'ALL';
        if ($scope.itemNam1 == null) $scope.itemNam1 = 'ALL';
        if ($scope.itemHinhThuc == null) $scope.itemHinhThuc = 'ALL';
        console.log('hello');
        //if ($scope.itemDonVi == null) $scope.itemDonVi = 'ALL';

    });
  
}]);
angular.module('WebApiApp').controller('SearchCaNhanController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {
    $scope.Search_CN = function (search) {
        // if (search != "" && search != null)
        {
            $http({
                method: 'GET',
                url: '/api/Search/DsCaNhan',
                params: { Search: search }
            }).then(function successCallback(response) {
                $scope.DsCaNhan = response.data;
                var DuLieuGoc = response.data;
                try {
                    if ($scope.DsCNSelect != null && $scope.DsCNSelect.length > 0)
                        angular.forEach($scope.DsCaNhan, function (itemCN) {
                            var check = $scope.DsCNSelect.filter(t => t.Code == itemCN.Code);
                            if (check != null && check.length > 0) {
                                var isExist = $scope.DsCaNhan.indexOf(itemCN);
                                if (isExist > -1)
                                    $scope.DsCaNhan.splice(isExist, 1);
                            }
                        });
                } catch{ }

            }, function errorCallback(response) {
                toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
            });
        }
        //else
        //  $scope.DsCaNhan = [];
    }
    if ($scope.DsCaNhan == null) $scope.Search_CN('');
    $scope.SelectDTCN = function (itemCN, index) {
        if ($scope.DsCNSelect == null) $scope.DsCNSelect = [];
        var check = $scope.DsCNSelect.filter(t => t.Code == itemCN.Code);
        if (check == null || check.length <= 0)
            $scope.DsCNSelect.push(itemCN);
        try { $scope.DsCaNhan.splice(index, 1); } catch{ }
    }
    $scope.DelSelectDTCN = function (itemCN, index) {
        if ($scope.DsCaNhan == null) $scope.DsCaNhan = [];
        var check = $scope.DsCaNhan.filter(t => t.Code == itemCN.Code);
        if (check == null || check.length <= 0)
            $scope.DsCaNhan.push(itemCN);
        try { $scope.DsCNSelect.splice(index, 1); } catch{ }
    }
    $scope.DeletAllCNSelect = function () {
        if ($scope.DsCaNhan == null) $scope.DsCaNhan = [];
        $scope.DsCaNhan = $scope.DsCaNhan.concat($scope.DsCNSelect);
        $scope.DsCNSelect = [];
        
    }
}]);
angular.module('WebApiApp').controller('SearchTapTheController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

  
    $scope.Search_TT = function (search) {
        //if (search != "" && search != null)
        {
            $http({
                method: 'GET',
                url: '/api/Search/DsTapThe',
                params: { Search: search }
            }).then(function successCallback(response) {
                $scope.DsTapThe = response.data;
                try {
                    if ($scope.DsTTSelect != null && $scope.DsTTSelect.length > 0)
                        angular.forEach($scope.DsTapThe, function (itemTT) {
                            var check = $scope.DsTTSelect.filter(t => t.Code == itemTT.Code);
                            if (check != null && check.length > 0)
                                $scope.DsTapThe.splice(index, 1);
                        });
                } catch{ }

            }, function errorCallback(response) {
                toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
            });
        }
        // else   $scope.DsTapThe = [];
    }
    if ($scope.DsTapThe == null)
        $scope.Search_TT('');
    $scope.SelectDTTT = function (itemTT, index) {
        if ($scope.DsTTSelect == null) $scope.DsTTSelect = [];
        var check = $scope.DsTTSelect.filter(t => t.Code == itemTT.Code);
        if (check == null || check.length <= 0)
            $scope.DsTTSelect.push(itemTT);
        try { $scope.DsTapThe.splice(index, 1); } catch{ }
    }
    $scope.DelSelectDTTT = function (itemTT, index) {
        if ($scope.DsTapThe == null) $scope.DsTapThe = [];
        var check = $scope.DsTapThe.filter(t => t.Code == itemTT.Code);
        if (check == null || check.length <= 0)
            $scope.DsTapThe.push(itemTT);
        try { $scope.DsTTSelect.splice(index, 1); } catch{ }
    }
    $scope.DeletAllTTSelect = function () {
        if ($scope.DsCaNhan == null) $scope.DsTapThe = [];
        $scope.DsTapThe = $scope.DsTapThe.concat($scope.DsTTSelect);
        $scope.DsTTSelect = [];
    }
}]);