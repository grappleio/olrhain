'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/branchs', {
            templateUrl: 'views/branchs/list.html'
        }).
        when('/branchs/create', {
            templateUrl: 'views/branchs/create.html'
        }).
        when('/branchs/:branchId/edit', {
            templateUrl: 'views/branchs/edit.html'
        }).
        when('/branchs/:branchId', {
            templateUrl: 'views/branchs/view.html'
        }).
        when('/tests', {
            templateUrl: 'views/tests/list.html'
        }).
        when('/tests/create', {
            templateUrl: 'views/tests/create.html'
        }).
        when('/tests/:testId/edit', {
            templateUrl: 'views/tests/edit.html'
        }).
        when('/tests/:testId', {
            templateUrl: 'views/tests/view.html'
        }).
        when('/reports', {
            templateUrl: 'views/reports/list.html'
        }).
        when('/reports/create', {
            templateUrl: 'views/reports/create.html'
        }).
        when('/reports/:reportId/edit', {
            templateUrl: 'views/reports/edit.html'
        }).
        when('/reports/:reportId', {
            templateUrl: 'views/reports/view.html'
        }).
        when('/steps', {
            templateUrl: 'views/steps/list.html'
        }).
        when('/steps/create', {
            templateUrl: 'views/steps/create.html'
        }).
        when('/steps/:stepId/edit', {
            templateUrl: 'views/steps/edit.html'
        }).
        when('/steps/:stepId', {
            templateUrl: 'views/steps/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        when('/headers', {
            templateUrl: 'views/headers/list.html'
        }).
        when('/headers/create', {
            templateUrl: 'views/headers/create.html'
        }).
        when('/headers/:headerId/edit', {
            templateUrl: 'views/headers/edit.html'
        }).
        when('/headers/:headerId', {
            templateUrl: 'views/headers/view.html'
        }).
        when('/components', {
            templateUrl: 'views/components/list.html'
        }).
        when('/components/create', {
            templateUrl: 'views/components/create.html'
        }).
        when('/components/:componentId/edit', {
            templateUrl: 'views/components/edit.html'
        }).
        when('/components/:componentId', {
            templateUrl: 'views/components/view.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);