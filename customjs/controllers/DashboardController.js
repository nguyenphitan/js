angular.module('WebApiApp').controller('DashboardController', function ($rootScope, $scope, $http, $timeout, $cookies) {

    $scope.ViewTotal = function () {
        $scope.item =
            {
                Count_0: '0',
                Count_1: '0',
                Count_2: '0',
                Count_3: '0',
            }
        $http({
            method: 'GET',
            url: '/api/Index/CountInspectionByType',
            params: { typeHome: $scope.CheckDisplay }
        }).then(function successCallback(response) {

            for (var i = 0; i < response.data.length; i++) {
                if (i == 0)
                    $scope.item.Count_0 = response.data[i]; // đột xuất
                if (i == 1)
                    $scope.item.Count_1 = response.data[i]; //kế hoạch
                if (i == 2)
                    $scope.item.Count_2 = response.data[i]; // Thanh tra lại
                if (i == 3)
                    $scope.item.Count_3 = response.data[i]; // chuyên đề
            }
            //console.log(response.data);
        }, function errorCallback(response) {
        });
    }
    $scope.ViewBieuDoTron = function () {
        if ($scope.CheckDisplay === "1") {
            $http({
                method: 'GET',
                url: '/api/Index/GetInfoInspecByCompany',
                params: { typeHome: $scope.CheckDisplay }
            }).then(function successCallback(response) {
                $scope.listCount1 = [];
                for (var i = 0; i < response.data.length; i++) {
                    var item = {
                        number: $scope.GetStatusInspect(response.data[i])
                    }
                    $scope.listCount1.push(item);
                }
                $scope.Status_All_1 = $scope.listCount1.reduce(function (r, a) {
                    return r + +(a.number === "1");
                }, 0);
                $scope.Status_All_2 = $scope.listCount1.reduce(function (r, a) {
                    return r + +(a.number === "0");
                }, 0);
                $scope.Status_All_3 = $scope.listCount1.reduce(function (r, a) {
                    return r + +(a.number === "2");
                }, 0);
                $scope.Status_All_4 = $scope.listCount1.reduce(function (r, a) {
                    return r + +(a.number === "3");
                }, 0);

                $timeout(function () {
                    $('#bieu_do_tron1').highcharts({
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie',
                            style: {
                                fontFamily: 'Arial'
                            }

                        },
                        title: {
                            text: 'Tổng hợp trạng thái thanh, kiểm tra năm ' + new Date().getFullYear(),
                            //'Đến ngày ' + new Date().toLocaleDateString(),// + ' tháng ' + new Date().getMonth() + ' năm ' + new Date().getFullYear(),
                            style: {
                                //fontFamily: 'Arial',
                                fontSize: '16px'
                            }
                        },
                        subtitle: {
                            text: 'Toàn tỉnh',
                        },
                        tooltip: {
                            style: {
                                fontFamily: 'Arial'
                            },
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'

                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true,

                            },
                            series: {
                                animation: false
                            }

                        },
                        legend: {
                            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                            borderColor: '#CCC',
                            borderWidth: 1,
                            shadow: false,
                            align: 'center',
                            itemStyle: {
                                fontFamily: 'Arial',
                                fontWeight: 'none',
                                fontSize: '10px'
                            },
                        },
                        series: [{
                            type: 'pie',
                            name: 'Tỷ lệ',
                            colorByPoint: true,
                            data: [
                                {
                                    name: 'Chưa bắt đầu: ' + '<b>' + $scope.Status_All_2 + '</b>',
                                    y: $scope.Status_All_2,
                                    color: '#F1C40F'

                                },
                                {
                                    name: 'Đang tiến hành: ' + '<b>' + $scope.Status_All_1 + '</b>',
                                    y: $scope.Status_All_1,
                                    color: '#337ab7'

                                },
                                {
                                    name: 'Sau kế hoạch: ' + '<b>' + $scope.Status_All_3 + '</b>',
                                    y: $scope.Status_All_3,
                                    color: '#ed6b75'
                                },
                                {
                                    name: 'Hoàn thành: ' + '<b>' + $scope.Status_All_4 + '</b>',
                                    y: $scope.Status_All_4,
                                    color: '#36c6d3'
                                }
                            ]
                        }]
                    });
                }, 500);
            }, function errorCallback(response) {
            });
        }
        $http({
            method: 'GET',
            url: '/api/Index/GetInfoInspecByCompany',
            params: { typeHome: "0" }
        }).then(function successCallback(response) {
            $scope.listCount = [];
            for (var i = 0; i < response.data.length; i++) {
                var item = {
                    number: $scope.GetStatusInspect(response.data[i])
                }
                $scope.listCount.push(item);
            }
            $scope.Status_1 = $scope.listCount.reduce(function (r, a) {
                return r + +(a.number === "1");
            }, 0);
            $scope.Status_2 = $scope.listCount.reduce(function (r, a) {
                return r + +(a.number === "0");
            }, 0);
            $scope.Status_3 = $scope.listCount.reduce(function (r, a) {
                return r + +(a.number === "2");
            }, 0);
            $scope.Status_4 = $scope.listCount.reduce(function (r, a) {
                return r + +(a.number === "3");
            }, 0);

            $timeout(function () {
                $('#bieu_do_tron').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie',
                        style: {
                            fontFamily: 'Arial'
                        }

                    },
                    title: {
                        text: 'Tổng hợp trạng thái thanh, kiểm tra năm ' + new Date().getFullYear(),
                        //'Đến ngày ' + new Date().toLocaleDateString(),// + ' tháng ' + new Date().getMonth() + ' năm ' + new Date().getFullYear(),
                        style: {
                            //fontFamily: 'Arial',
                            fontSize: '16px'
                        }
                    },
                    subtitle: {
                        text: $cookies.get('DonVi'),
                    },
                    tooltip: {
                        style: {
                            fontFamily: 'Arial'
                        },
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'

                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true,

                        },
                        series: {
                            animation: false
                        }

                    },
                    legend: {
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                        borderColor: '#CCC',
                        borderWidth: 1,
                        shadow: false,
                        align: 'center',
                        itemStyle: {
                            fontFamily: 'Arial',
                            fontWeight: 'none',
                            fontSize: '10px'
                        },
                    },
                    series: [{
                        type: 'pie',
                        name: 'Tỷ lệ',
                        colorByPoint: true,
                        data: [
                            {
                                name: 'Chưa bắt đầu: ' + '<b>' + $scope.Status_2 + '</b>',
                                y: $scope.Status_2,
                                color: '#F1C40F'

                            },
                            {
                                name: 'Đang tiến hành: ' + '<b>' + $scope.Status_1 + '</b>',
                                y: $scope.Status_1,
                                color: '#337ab7'

                            },
                            {
                                name: 'Sau kế hoạch: ' + '<b>' + $scope.Status_3 + '</b>',
                                y: $scope.Status_3,
                                color: '#ed6b75'
                            },
                            {
                                name: 'Hoàn thành: ' + '<b>' + $scope.Status_4 + '</b>',
                                y: $scope.Status_4,
                                color: '#36c6d3'
                            }
                        ]
                    }]
                });
            }, 500);


        }, function errorCallback(response) {
        });
    }
    $scope.ViewBieuDoCot = function () {
        if ($scope.CheckDisplay === "1") {
            $http({
                method: 'GET',
                url: '/api/Index/GetBieuDoCot',
                params: { typeHome: $scope.CheckDisplay }
            }).then(function successCallback(response) {
                $scope.listCount_BDC0_All = []; // đột xuất
                $scope.listCount_BDC1_All = []; // kế hoạch
                $scope.listCount_BDC2_All = []; // chuyên đề
                $scope.listCount_BDC3_All = []; // thanh tra lại
                for (var i = 0; i < response.data.length; i++) {
                    if (i == 0) {
                        for (var j = 0; j < response.data[i].length; j++) {
                            var item = {
                                number: $scope.GetStatusInspect(response.data[i][j])
                            }
                            $scope.listCount_BDC0_All.push(item);
                        }
                    }
                    if (i == 1) {
                        for (var j = 0; j < response.data[i].length; j++) {
                            var item = {
                                number: $scope.GetStatusInspect(response.data[i][j])
                            }
                            $scope.listCount_BDC1_All.push(item);
                        }
                    }
                    if (i == 2) {
                        for (var j = 0; j < response.data[i].length; j++) {
                            var item = {
                                number: $scope.GetStatusInspect(response.data[i][j])
                            }
                            $scope.listCount_BDC2_All.push(item);
                        }
                    }
                    if (i == 3) {
                        for (var j = 0; j < response.data[i].length; j++) {
                            var item = {
                                number: $scope.GetStatusInspect(response.data[i][j])
                            }
                            $scope.listCount_BDC3_All.push(item);
                        }
                    }
                }

                $scope.data0_All = [];
                $scope.data1_All = [];
                $scope.data2_All = [];
                $scope.data3_All = [];

                //chưa bắt đầu
                $scope.data0_All.push($scope.listCount_BDC1_All.reduce(function (r, a) {
                    return r + +(a.number === "0");
                }, 0));
                $scope.data0_All.push($scope.listCount_BDC0_All.reduce(function (r, a) {
                    return r + +(a.number === "0");
                }, 0));
                $scope.data0_All.push($scope.listCount_BDC2_All.reduce(function (r, a) {
                    return r + +(a.number === "0");
                }, 0));
                $scope.data0_All.push($scope.listCount_BDC3_All.reduce(function (r, a) {
                    return r + +(a.number === "0");
                }, 0));

                //Đang tiến hành
                $scope.data1_All.push($scope.listCount_BDC1_All.reduce(function (r, a) {
                    return r + +(a.number === "1");
                }, 0));
                $scope.data1_All.push($scope.listCount_BDC0_All.reduce(function (r, a) {
                    return r + +(a.number === "1");
                }, 0));
                $scope.data1_All.push($scope.listCount_BDC2_All.reduce(function (r, a) {
                    return r + +(a.number === "1");
                }, 0));
                $scope.data1_All.push($scope.listCount_BDC3_All.reduce(function (r, a) {
                    return r + +(a.number === "1");
                }, 0));

                //Chuyên đề
                $scope.data2_All.push($scope.listCount_BDC1_All.reduce(function (r, a) {
                    return r + +(a.number === "2");
                }, 0));
                $scope.data2_All.push($scope.listCount_BDC0_All.reduce(function (r, a) {
                    return r + +(a.number === "2");
                }, 0));
                $scope.data2_All.push($scope.listCount_BDC2_All.reduce(function (r, a) {
                    return 2 + +(a.number === "2");
                }, 0));
                $scope.data2_All.push($scope.listCount_BDC3_All.reduce(function (r, a) {
                    return r + +(a.number === "2");
                }, 0));

                //Thanh tra lại
                $scope.data3_All.push($scope.listCount_BDC1_All.reduce(function (r, a) {
                    return r + +(a.number === "3");
                }, 0));
                $scope.data3_All.push($scope.listCount_BDC0_All.reduce(function (r, a) {
                    return r + +(a.number === "3");
                }, 0));
                $scope.data3_All.push($scope.listCount_BDC2_All.reduce(function (r, a) {
                    return 2 + +(a.number === "3");
                }, 0));
                $scope.data3_All.push($scope.listCount_BDC3_All.reduce(function (r, a) {
                    return r + +(a.number === "3");
                }, 0));


                $timeout(function () {
                    $('#container1').highcharts({
                        chart: {
                            type: 'column',
                            style: {
                                fontFamily: 'Arial'
                            }
                        },
                        title: {
                            text: 'Tổng hợp dữ liệu thanh, kiểm tra năm ' + new Date().getFullYear(),
                            style: {
                                //fontFamily: 'Arial',
                                fontSize: '16px'
                            }
                        },
                        subtitle: {
                            text: "Toàn tỉnh",
                        },
                        xAxis: {
                            categories: [
                                'Theo kế hoạch',
                                'Đột xuất',
                                'Chương trình, chuyên đề',
                                'Thanh tra lại'
                            ],
                            //crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Số lượng'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        legend: {
                            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                            borderColor: '#CCC',
                            borderWidth: 1,
                            shadow: false,
                            align: 'center',
                            itemStyle: {
                                fontFamily: 'Arial',
                                fontWeight: 'none',
                                fontSize: '10px'
                            },
                        },
                        series: [{
                            name: 'Chưa bắt đầu',
                            data: $scope.data0_All,//[49.9, 71.5, 106.4, 129.2],
                            color: 'rgb(241, 196, 15)'

                        }, {
                            name: 'Đang tiến hành',
                            data: $scope.data1_All,//[42.4, 33.2, 34.5, 39.7],
                            color: '#337ab7'

                        }, {
                            name: 'Sau kế hoạch',
                            data: $scope.data2_All,//[42.4, 33.2, 34.5, 39.7],
                            color: '#ed6b75'

                        }, {
                            name: 'Hoàn thành',
                            data: $scope.data3_All,//[42.4, 33.2, 34.5, 39.7],
                            color: '#36c6d3'

                        }]
                    });
                }, 500);
            }, function errorCallback(response) {
            });
        }
        $http({
            method: 'GET',
            url: '/api/Index/GetBieuDoCot',
            params: { typeHome: "0" }
        }).then(function successCallback(response) {
            $scope.listCount_BDC0 = []; // đột xuất
            $scope.listCount_BDC1 = []; // kế hoạch
            $scope.listCount_BDC2 = []; // chuyên đề
            $scope.listCount_BDC3 = []; // thanh tra lại
            for (var i = 0; i < response.data.length; i++) {
                if (i == 0) {
                    for (var j = 0; j < response.data[i].length; j++) {
                        var item = {
                            number: $scope.GetStatusInspect(response.data[i][j])
                        }
                        $scope.listCount_BDC0.push(item);
                    }
                }
                if (i == 1) {
                    for (var j = 0; j < response.data[i].length; j++) {
                        var item = {
                            number: $scope.GetStatusInspect(response.data[i][j])
                        }
                        $scope.listCount_BDC1.push(item);
                    }
                }
                if (i == 2) {
                    for (var j = 0; j < response.data[i].length; j++) {
                        var item = {
                            number: $scope.GetStatusInspect(response.data[i][j])
                        }
                        $scope.listCount_BDC2.push(item);
                    }
                }
                if (i == 3) {
                    for (var j = 0; j < response.data[i].length; j++) {
                        var item = {
                            number: $scope.GetStatusInspect(response.data[i][j])
                        }
                        $scope.listCount_BDC3.push(item);
                    }
                }
            }

            $scope.data0 = [];
            $scope.data1 = [];
            $scope.data2 = [];
            $scope.data3 = [];

            //chưa bắt đầu
            $scope.data0.push($scope.listCount_BDC1.reduce(function (r, a) {
                return r + +(a.number === "0");
            }, 0));
            $scope.data0.push($scope.listCount_BDC0.reduce(function (r, a) {
                return r + +(a.number === "0");
            }, 0));
            $scope.data0.push($scope.listCount_BDC2.reduce(function (r, a) {
                return r + +(a.number === "0");
            }, 0));
            $scope.data0.push($scope.listCount_BDC3.reduce(function (r, a) {
                return r + +(a.number === "0");
            }, 0));

            //Đang tiến hành
            $scope.data1.push($scope.listCount_BDC1.reduce(function (r, a) {
                return r + +(a.number === "1");
            }, 0));
            $scope.data1.push($scope.listCount_BDC0.reduce(function (r, a) {
                return r + +(a.number === "1");
            }, 0));
            $scope.data1.push($scope.listCount_BDC2.reduce(function (r, a) {
                return r + +(a.number === "1");
            }, 0));
            $scope.data1.push($scope.listCount_BDC3.reduce(function (r, a) {
                return r + +(a.number === "1");
            }, 0));

            //Chuyên đề
            $scope.data2.push($scope.listCount_BDC1.reduce(function (r, a) {
                return r + +(a.number === "2");
            }, 0));
            $scope.data2.push($scope.listCount_BDC0.reduce(function (r, a) {
                return r + +(a.number === "2");
            }, 0));
            $scope.data2.push($scope.listCount_BDC2.reduce(function (r, a) {
                return 2 + +(a.number === "2");
            }, 0));
            $scope.data2.push($scope.listCount_BDC3.reduce(function (r, a) {
                return r + +(a.number === "2");
            }, 0));

            //Thanh tra lại
            $scope.data3.push($scope.listCount_BDC1.reduce(function (r, a) {
                return r + +(a.number === "3");
            }, 0));
            $scope.data3.push($scope.listCount_BDC0.reduce(function (r, a) {
                return r + +(a.number === "3");
            }, 0));
            $scope.data3.push($scope.listCount_BDC2.reduce(function (r, a) {
                return 2 + +(a.number === "3");
            }, 0));
            $scope.data3.push($scope.listCount_BDC3.reduce(function (r, a) {
                return r + +(a.number === "3");
            }, 0));


            $timeout(function () {
                $('#container').highcharts({
                    chart: {
                        type: 'column',
                        style: {
                            fontFamily: 'Arial'
                        }
                    },
                    title: {
                        text: 'Tổng hợp dữ liệu thanh, kiểm tra năm ' + new Date().getFullYear(),
                        style: {
                            //fontFamily: 'Arial',
                            fontSize: '16px'
                        }
                    },
                    subtitle: {
                        text: $cookies.get('DonVi'),
                    },
                    xAxis: {
                        categories: [
                            'Theo kế hoạch',
                            'Đột xuất',
                            'Chương trình, chuyên đề',
                            'Thanh tra lại'
                        ],
                        //crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Số lượng'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    legend: {
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                        borderColor: '#CCC',
                        borderWidth: 1,
                        shadow: false,
                        align: 'center',
                        itemStyle: {
                            fontFamily: 'Arial',
                            fontWeight: 'none',
                            fontSize: '10px'
                        },
                    },
                    series: [{
                        name: 'Chưa bắt đầu',
                        data: $scope.data0,//[49.9, 71.5, 106.4, 129.2],
                        color: 'rgb(241, 196, 15)'

                    }, {
                        name: 'Đang tiến hành',
                        data: $scope.data1,//[42.4, 33.2, 34.5, 39.7],
                        color: '#337ab7'

                    }, {
                        name: 'Sau kế hoạch',
                        data: $scope.data2,//[42.4, 33.2, 34.5, 39.7],
                        color: '#ed6b75'

                    }, {
                        name: 'Hoàn thành',
                        data: $scope.data3,//[42.4, 33.2, 34.5, 39.7],
                        color: '#36c6d3'

                    }]
                });
            }, 500);
        }, function errorCallback(response) {
        });


    }
    function getMinProgress(data) {
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
    $scope.GetStatusInspect = function (item) {
        var check_ListObjectByInspect = "0";
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
        return check_ListObjectByInspect
        //if (check_ListObjectByInspect == "0") {
        //    return "Chưa bắt đầu";
        //}
        //if (check_ListObjectByInspect == "1") {
        //    return "Đang tiến hành";
        //}
        //if (check_ListObjectByInspect == "2") {
        //    return "Sau kế hoạch";
        //}
        //if (check_ListObjectByInspect == "3") {
        //    return "Hoàn thành";
        //}
    }

    $scope.$on('$viewContentLoaded', function () {
        $http({
            method: 'GET',
            url: '/api/UserProfiles/GetRoleOfCurentUser',
        }).then(function successCallback(response) {
            $rootScope.CheckDisplay = response.data;
            if ($rootScope.CheckDisplay == "0") {
                $scope.options = 'views-client/HomePage/home1.html';
            }
            if ($scope.CheckDisplay === "1") {
                $scope.options = 'views-client/HomePage/home2.html';
            }
            $scope.ViewTotal();
            $scope.ViewBieuDoCot();
            $scope.ViewBieuDoTron();
        }, function errorCallback(response) {

        });
        $scope.NotiKHCD();
        $scope.Noti_DonVi();
        //$scope.Noti_User();
        $scope.Mess_User();
        $scope.Noti_OrgLead();
        //$timeout(function () {
         
        //}, 500);
        

    });


    // set sidebar closed and body solid layout mode
    $rootScope.$settings.layout.pageContentWhite = true;
    $rootScope.$settings.layout.pageBodySolid = false;
    $rootScope.$settings.layout.pageSidebarClosed = false;
});