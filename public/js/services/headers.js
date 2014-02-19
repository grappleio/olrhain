'use strict';

//Headers service used for headers REST endpoint
angular.module('mean.headers').factory('Headers', ['$resource', function($resource) {
    return $resource('headers/:headerId', {
        headerId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);