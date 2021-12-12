/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var WebApiApp = angular.module("WebApiApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
    "ngCookies"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
WebApiApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
WebApiApp.config(['$controllerProvider', function($controllerProvider) {
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
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout',
    };
        

   


    return $settings;
}]);

/* Setup App Main Controller */
WebApiApp.controller('AppController', ['$scope', '$rootScope', '$cookies', function ($scope, $rootScope, $cookies) {
    $scope.$on('$viewContentLoaded', function() {
        //App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
        //var auth = $cookies.get('username');
        //console.log(auth);
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
WebApiApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
WebApiApp.controller('SidebarController', ['$state', '$scope', function($state, $scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar($state); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
WebApiApp.controller('QuickSidebarController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
WebApiApp.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
WebApiApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
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
            "hideMethod": "fadeOut"
        }
    });


}]);

/* Setup Rounting For All Pages */
WebApiApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    // Redirect any unmatched url
    //$locationProvider.html5Mode(true);
    //if ($cookies.get('username') == null) {
    $urlRouterProvider.otherwise("/auth");
    //}
    //else {
    //    $urlRouterProvider.otherwise("dashboard");
    //}

    $stateProvider
         // Dashboard
        .state('/auth', {
            url: "/auth",
            templateUrl: "views-client/Account/login.html",
            data: { pageTitle: 'PHẦN MỀM QUẢN LÝ THI ĐẤU F1' },
            controller: "LoginController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'WebApiApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/css/login-5.min.css',
                            '../assets/global/plugins/ladda/ladda-themeless.min.css',
                            '../assets/global/scripts/app.min.js',
                            'js/controllers/LoginController.js',
                        ]
                    });
                }]
               
            }
        })
        .state('/access_token', {
            url: "/access_token={accessToken}&token_type={tokenType}&expires_in={expiresIn}",
            templateUrl: "views-client/Account/login.html",
            data: { pageTitle: 'PHẦN MỀM QUẢN LÝ THI ĐẤU F1' },
            controller: "LoginController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'WebApiApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/css/login-5.min.css',
                            '../assets/global/plugins/ladda/ladda-themeless.min.css',
                            '../assets/global/scripts/app.min.js',
                            'js/controllers/LoginController.js',
                        ]
                    });
                }]

            }
        })

    //$stateProvider
    //     // Dashboard
    //    .state('mainmenu', {
    //        url: "/mainmenu",
    //        templateUrl: "views-client/menu/mainmenu.html",
    //        data: { pageTitle: 'Admin Dashboard Template' },
    //        controller: "MainMenuController",
    //        resolve: {
    //            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
    //                return $ocLazyLoad.load({
    //                    name: 'WebApiApp',
    //                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
    //                    files: [
    //                        '../assets/global/plugins/morris/morris.css',
    //                        '../assets/global/plugins/morris/morris.min.js',
    //                        '../assets/global/plugins/morris/raphael-min.js',
    //                        '../assets/global/plugins/jquery.sparkline.min.js',
    //                        '../assets/pages/scripts/dashboard.min.js',
    //                        'js/controllers/MainMenuController.js',
    //                    ]
    //                });
    //            }]
    //        }
    //    })

    //    // Dashboard
    //    .state('dashboard', {
    //        url: "/dashboard.html",
    //        templateUrl: "views-client/dashboard.html",
    //        data: {pageTitle: 'Admin Dashboard Template'},
    //        controller: "DashboardController",
    //        resolve: {
    //            deps: ['$ocLazyLoad', function($ocLazyLoad) {
    //                return $ocLazyLoad.load({
    //                    name: 'WebApiApp',
    //                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
    //                    files: [
    //                        '../assets/global/plugins/morris/morris.css',                            
    //                        '../assets/global/plugins/morris/morris.min.js',
    //                        '../assets/global/plugins/morris/raphael-min.js',                            
    //                        '../assets/global/plugins/jquery.sparkline.min.js',

    //                        '../assets/pages/scripts/dashboard.min.js',
    //                        'js/controllers/DashboardController.js',
    //                    ] 
    //                });
    //            }]
    //        }
    //    })

    //    // Blank Page
    //    .state('blank', {
    //        url: "/blank",
    //        templateUrl: "views-client/blank.html",
    //        data: {pageTitle: 'Blank Page Template'},
    //        controller: "BlankController",
    //        resolve: {
    //            deps: ['$ocLazyLoad', function($ocLazyLoad) {
    //                return $ocLazyLoad.load({
    //                    name: 'WebApiApp',
    //                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
    //                    files: [
    //                        'js/controllers/BlankController.js'
    //                    ] 
    //                });
    //            }]
    //        }
    //    })

    //    // AngularJS plugins
    //    .state('fileupload', {
    //        url: "/file_upload.html",
    //        templateUrl: "views-client/file_upload.html",
    //        data: {pageTitle: 'AngularJS File Upload'},
    //        controller: "GeneralPageController",
    //        resolve: {
    //            deps: ['$ocLazyLoad', function($ocLazyLoad) {
    //                return $ocLazyLoad.load([{
    //                    name: 'angularFileUpload',
    //                    files: [
    //                        '../assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js',
    //                    ] 
    //                }, {
    //                    name: 'WebApiApp',
    //                    files: [
    //                        'js/controllers/GeneralPageController.js'
    //                    ]
    //                }]);
    //            }]
    //        }
    //    })

    //    // UI Select
    //    .state('uiselect', {
    //        url: "/ui_select.html",
    //        templateUrl: "views-client/ui_select.html",
    //        data: {pageTitle: 'AngularJS Ui Select'},
    //        controller: "UISelectController",
    //        resolve: {
    //            deps: ['$ocLazyLoad', function($ocLazyLoad) {
    //                return $ocLazyLoad.load([{
    //                    name: 'ui.select',
    //                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
    //                    files: [
    //                        '../assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
    //                        '../assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
    //                    ] 
    //                }, {
    //                    name: 'WebApiApp',
    //                    files: [
    //                        'js/controllers/UISelectController.js'
    //                    ] 
    //                }]);
    //            }]
    //        }
    //    })

    //    // UI Bootstrap
    //    .state('uibootstrap', {
    //        url: "/ui_bootstrap.html",
    //        templateUrl: "views-client/ui_bootstrap.html",
    //        data: {pageTitle: 'AngularJS UI Bootstrap'},
    //        controller: "GeneralPageController",
    //        resolve: {
    //            deps: ['$ocLazyLoad', function($ocLazyLoad) {
    //                return $ocLazyLoad.load([{
    //                    name: 'WebApiApp',
    //                    files: [
    //                        'js/controllers/GeneralPageController.js'
    //                    ] 
    //                }]);
    //            }] 
    //        }
    //    })

    //    // Tree View
    //    .state('tree', {
    //        url: "/tree",
    //        templateUrl: "views-client/tree.html",
    //        data: {pageTitle: 'jQuery Tree View'},
    //        controller: "GeneralPageController",
    //        resolve: {
    //            deps: ['$ocLazyLoad', function($ocLazyLoad) {
    //                return $ocLazyLoad.load([{
    //                    name: 'WebApiApp',
    //                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
    //                    files: [
    //                        '../assets/global/plugins/jstree/dist/themes/default/style.min.css',

    //                        '../assets/global/plugins/jstree/dist/jstree.min.js',
    //                        '../assets/pages/scripts/ui-tree.min.js',
    //                        'js/controllers/GeneralPageController.js'
    //                    ] 
    //                }]);
    //            }] 
    //        }
    //    })     

    //    // Form Tools
    //    .state('formtools', {
    //        url: "/form-tools",
    //        templateUrl: "views-client/form_tools.html",
    //        data: {pageTitle: 'Form Tools'},
    //        controller: "GeneralPageController",
    //        resolve: {
    //            deps: ['$ocLazyLoad', function($ocLazyLoad) {
    //                return $ocLazyLoad.load([{
    //                    name: 'WebApiApp',
    //                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
    //                    files: [
    //                        '../assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
    //                        '../assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
    //                        '../assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',
    //                        '../assets/global/plugins/typeahead/typeahead.css',

    //                        '../assets/global/plugins/fuelux/js/spinner.min.js',
    //                        '../assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
    //                        '../assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
    //                        '../assets/global/plugins/jquery.input-ip-address-control-1.0.min.js',
    //                        '../assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
    //                        '../assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
    //                        '../assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
    //                        '../assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
    //                        '../assets/global/plugins/typeahead/handlebars.min.js',
    //                        '../assets/global/plugins/typeahead/typeahead.bundle.min.js',
    //                        '../assets/pages/scripts/components-form-tools-2.min.js',

    //                        'js/controllers/GeneralPageController.js'
    //                    ] 
    //                }]);
    //            }] 
    //        }
    //    })        

    //    // Date & Time Pickers
    //    .state('pickers', {
    //        url: "/pickers",
    //        templateUrl: "views-client/pickers.html",
    //        data: {pageTitle: 'Date & Time Pickers'},
    //        controller: "GeneralPageController",
    //        resolve: {
    //            deps: ['$ocLazyLoad', function($ocLazyLoad) {
    //                return $ocLazyLoad.load([{
    //                    name: 'WebApiApp',
    //                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
    //                    files: [
    //                        '../assets/global/plugins/clockface/css/clockface.css',
    //                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
    //                        '../assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
    //                        '../assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
    //                        '../assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',

    //                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
    //                        '../assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
    //                        '../assets/global/plugins/clockface/js/clockface.js',
    //                        '../assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
    //                        '../assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',

    //                        '../assets/pages/scripts/components-date-time-pickers.min.js',

    //                        'js/controllers/GeneralPageController.js'
    //                    ] 
    //                }]);
    //            }] 
    //        }
    //    })

    //    // Custom Dropdowns
    //    .state('dropdowns', {
    //        url: "/dropdowns",
    //        templateUrl: "views-client/dropdowns.html",
    //        data: {pageTitle: 'Custom Dropdowns'},
    //        controller: "GeneralPageController",
    //        resolve: {
    //            deps: ['$ocLazyLoad', function($ocLazyLoad) {
    //                return $ocLazyLoad.load([{
    //                    name: 'WebApiApp',
    //                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
    //                    files: [
    //                        '../assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
    //                        '../assets/global/plugins/select2/css/select2.min.css',
    //                        '../assets/global/plugins/select2/css/select2-bootstrap.min.css',

    //                        '../assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
    //                        '../assets/global/plugins/select2/js/select2.full.min.js',

    //                        '../assets/pages/scripts/components-bootstrap-select.min.js',
    //                        '../assets/pages/scripts/components-select2.min.js',

    //                        'js/controllers/GeneralPageController.js'
    //                    ] 
    //                }]);
    //            }] 
    //        }
    //    }) 

    //    // Advanced Datatables
    //    .state('datatablesmanaged', {
    //        url: "/datatables/managed.html",
    //        templateUrl: "views-client/datatables/managed.html",
    //        data: {pageTitle: 'Advanced Datatables'},
    //        controller: "GeneralPageController",
    //        resolve: {
    //            deps: ['$ocLazyLoad', function($ocLazyLoad) {
    //                return $ocLazyLoad.load({
    //                    name: 'WebApiApp',
    //                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
    //                    files: [                             
    //                        '../assets/global/plugins/datatables/datatables.min.css', 
    //                        '../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',

    //                        '../assets/global/plugins/datatables/datatables.all.min.js',

    //                        '../assets/pages/scripts/table-datatables-managed.min.js',

    //                        'js/controllers/GeneralPageController.js'
    //                    ]
    //                });
    //            }]
    //        }
    //    })

    //    // Ajax Datetables
    //    .state('datatablesajax', {
    //        url: "/datatables/ajax.html",
    //        templateUrl: "views-client/datatables/ajax.html",
    //        data: {pageTitle: 'Ajax Datatables'},
    //        controller: "GeneralPageController",
    //        resolve: {
    //            deps: ['$ocLazyLoad', function($ocLazyLoad) {
    //                return $ocLazyLoad.load({
    //                    name: 'WebApiApp',
    //                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
    //                    files: [
    //                        '../assets/global/plugins/datatables/datatables.min.css', 
    //                        '../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
    //                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',

    //                        '../assets/global/plugins/datatables/datatables.all.min.js',
    //                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
    //                        '../assets/global/scripts/datatable.js',

    //                        'js/scripts/table-ajax.js',
    //                        'js/controllers/GeneralPageController.js'
    //                    ]
    //                });
    //            }]
    //        }
    //    })

    //    // User Profile
    //    .state("profile", {
    //        url: "/profile",
    //        templateUrl: "views-client/profile/main.html",
    //        data: {pageTitle: 'User Profile'},
    //        controller: "UserProfileController",
    //        resolve: {
    //            deps: ['$ocLazyLoad', function($ocLazyLoad) {
    //                return $ocLazyLoad.load({
    //                    name: 'WebApiApp',  
    //                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
    //                    files: [
    //                        '../assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
    //                        '../assets/pages/css/profile.css',
                            
    //                        '../assets/global/plugins/jquery.sparkline.min.js',
    //                        '../assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',

    //                        '../assets/pages/scripts/profile.min.js',

    //                        'js/controllers/UserProfileController.js'
    //                    ]                    
    //                });
    //            }]
    //        }
    //    })

    //    // User Profile Dashboard
    //    .state("profile.dashboard", {
    //        url: "/dashboard",
    //        templateUrl: "views-client/profile/dashboard.html",
    //        data: {pageTitle: 'User Profile'}
    //    })

    //    // User Profile Account
    //    .state("profile.account", {
    //        url: "/account",
    //        templateUrl: "views-client/profile/account.html",
    //        data: {pageTitle: 'User Account'}
    //    })

    //    // User Profile Help
    //    .state("profile.help", {
    //        url: "/help",
    //        templateUrl: "views-client/profile/help.html",
    //        data: {pageTitle: 'User Help'}      
    //    })

    //    // Todo
    //    .state('todo', {
    //        url: "/todo",
    //        templateUrl: "views-client/todo.html",
    //        data: {pageTitle: 'Todo'},
    //        controller: "TodoController",
    //        resolve: {
    //            deps: ['$ocLazyLoad', function($ocLazyLoad) {
    //                return $ocLazyLoad.load({ 
    //                    name: 'WebApiApp',  
    //                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
    //                    files: [
    //                        '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
    //                        '../assets/apps/css/todo-2.css',
    //                        '../assets/global/plugins/select2/css/select2.min.css',
    //                        '../assets/global/plugins/select2/css/select2-bootstrap.min.css',

    //                        '../assets/global/plugins/select2/js/select2.full.min.js',
                            
    //                        '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',

    //                        '../assets/apps/scripts/todo-2.min.js',

    //                        'js/controllers/TodoController.js'  
    //                    ]                    
    //                });
    //            }]
    //        }
    //    })

}]);

/* Init global $settings and run the app */
WebApiApp.run(["$rootScope", "$settings", "$state", function ($rootScope, $settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = $settings; // state to be accessed from view
    
}]);



