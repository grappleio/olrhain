'use strict';

//Steps service used for steps REST endpoint
angular.module('mean.steps').factory('Steps', ['$resource', function($resource) {
    return $resource('steps/:stepId', {
        stepId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);