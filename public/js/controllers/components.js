'use strict';

angular.module('mean.components').controller('ComponentsController', ['$scope', '$routeParams', '$location', 'Global', 'Components', function ($scope, $routeParams, $location, Global, Components) {
    $scope.global = Global;

    $scope.create = function() {
        var component = new Components({
            title: this.title,
            content: this.content
        });
        component.$save(function(response) {
            $location.path('components/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(component) {
        if (component) {
            component.$remove();

            for (var i in $scope.components) {
                if ($scope.components[i] === component) {
                    $scope.components.splice(i, 1);
                }
            }
        }
        else {
            $scope.component.$remove();
            $location.path('components');
        }
    };

    $scope.update = function() {
        var component = $scope.component;
        if (!component.updated) {
            component.updated = [];
        }
        component.updated.push(new Date().getTime());

        component.$update(function() {
            $location.path('components/' + component._id);
        });
    };

    $scope.find = function() {
        Components.query(function(components) {
            $scope.components = components;
        });
    };

    $scope.findOne = function() {
        Components.get({
            componentId: $routeParams.componentId
        }, function(component) {
            $scope.component = component;
        });
    };
}]);