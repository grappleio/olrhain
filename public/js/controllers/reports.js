'use strict';

angular.module('mean.reports').controller('ReportsController', ['$scope', '$routeParams', '$location', 'Global', 'Reports', function ($scope, $routeParams, $location, Global, Reports) {
    $scope.global = Global;

    $scope.create = function() {
        var report = new Reports({
            title: this.title,
            content: this.content
        });
        report.$save(function(response) {
            $location.path('reports/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(report) {
        if (report) {
            report.$remove();

            for (var i in $scope.reports) {
                if ($scope.reports[i] === report) {
                    $scope.reports.splice(i, 1);
                }
            }
        }
        else {
            $scope.report.$remove();
            $location.path('reports');
        }
    };

    $scope.update = function() {
        var report = $scope.report;
        if (!report.updated) {
            report.updated = [];
        }
        report.updated.push(new Date().getTime());

        report.$update(function() {
            $location.path('reports/' + report._id);
        });
    };

    $scope.find = function() {
        Reports.query(function(reports) {
            $scope.reports = reports;
        });
    };

    $scope.findOne = function() {
        Reports.get({
            reportId: $routeParams.reportId
        }, function(report) {
            $scope.report = report;
        });
    };
}]);