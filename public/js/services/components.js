'use strict';

//Components service used for components REST endpoint
angular.module('mean.components').factory('Components', ['$resource', function($resource) {
    return $resource('components/:componentId', {
        componentId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);