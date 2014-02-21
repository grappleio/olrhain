'use strict';

//Tests service used for tests REST endpoint
angular.module('mean.tests').factory('Tests', ['$resource', function($resource) {
    return $resource('tests/:testId', {
        testId: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
        remove: {
        	method: 'DELETE'
        }

    });
}]);