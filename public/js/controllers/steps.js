'use strict';

angular.module('mean.steps').controller('StepsController', ['$scope', '$routeParams', '$location', 'Global', 'Steps', function ($scope, $routeParams, $location, Global, Steps) {
    $scope.global = Global;

    $scope.create = function() {
        var step = new Steps({
            title: this.title,
            content: this.content
        });
        step.$save(function(response) {
            $location.path('steps/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(step) {
        if (step) {
            step.$remove();

            for (var i in $scope.steps) {
                if ($scope.steps[i] === step) {
                    $scope.steps.splice(i, 1);
                }
            }
        }
        else {
            $scope.step.$remove();
            $location.path('steps');
        }
    };

    $scope.update = function() {
        var step = $scope.step;
        if (!step.updated) {
            step.updated = [];
        }
        step.updated.push(new Date().getTime());

        step.$update(function() {
            $location.path('steps/' + step._id);
        });
    };

    $scope.find = function() {
        Steps.query(function(steps) {
            $scope.steps = steps;
        });
    };

    $scope.findOne = function() {
        Steps.get({
            stepId: $routeParams.stepId
        }, function(step) {
            $scope.step = step;
        });
    };
}]);