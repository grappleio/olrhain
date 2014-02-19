'use strict';

//Reports service used for reports REST endpoint
angular.module('mean.reports').factory('Reports', ['$resource', function($resource) {
    return $resource('reports/:reportId', {
        reportId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);