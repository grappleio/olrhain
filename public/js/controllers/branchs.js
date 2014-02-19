'use strict';

angular.module('mean.branchs').controller('BranchsController', ['$scope', '$routeParams', '$location', 'Global', 'Branchs', function ($scope, $routeParams, $location, Global, Branchs) {
    $scope.global = Global;

    $scope.create = function() {
        var branch = new Branchs({
            title: this.title,
            content: this.content
        });
        branch.$save(function(response) {
            $location.path('branchs/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(branch) {
        if (branch) {
            branch.$remove();

            for (var i in $scope.branchs) {
                if ($scope.branchs[i] === branch) {
                    $scope.branchs.splice(i, 1);
                }
            }
        }
        else {
            $scope.branch.$remove();
            $location.path('branchs');
        }
    };

    $scope.update = function() {
        var branch = $scope.branch;
        if (!branch.updated) {
            branch.updated = [];
        }
        branch.updated.push(new Date().getTime());

        branch.$update(function() {
            $location.path('branchs/' + branch._id);
        });
    };

    $scope.find = function() {
        Branchs.query(function(branchs) {
            $scope.branchs = branchs;
        });
    };

    $scope.findOne = function() {
        Branchs.get({
            branchId: $routeParams.branchId
        }, function(branch) {
            $scope.branch = branch;
        });
    };
}]);