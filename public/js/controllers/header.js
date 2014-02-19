'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Reports',
        'link': 'reports'
    }, {
        'title': 'Tests',
        'link': 'tests'
    },
    {
        'title': 'Branches',
        'link': 'branchs'
    }];
    
    $scope.isCollapsed = false;
}]);