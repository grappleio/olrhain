'use strict';

//Branchs service used for branchs REST endpoint
angular.module('mean.branchs').factory('Branchs', ['$resource', function($resource) {
    return $resource('branchs/:branchId', {
        branchId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);