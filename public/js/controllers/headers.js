'use strict';

angular.module('mean.headers').controller('HeadersController', ['$scope', '$routeParams', '$location', 'Global', 'Headers', function ($scope, $routeParams, $location, Global, Headers) {
    $scope.global = Global;

    $scope.create = function() {
        var header = new Headers({
            title: this.title,
            content: this.content
        });
        header.$save(function(response) {
            $location.path('headers/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(header) {
        if (header) {
            header.$remove();

            for (var i in $scope.headers) {
                if ($scope.headers[i] === header) {
                    $scope.headers.splice(i, 1);
                }
            }
        }
        else {
            $scope.header.$remove();
            $location.path('headers');
        }
    };

    $scope.update = function() {
        var header = $scope.header;
        if (!header.updated) {
            header.updated = [];
        }
        header.updated.push(new Date().getTime());

        header.$update(function() {
            $location.path('headers/' + header._id);
        });
    };

    $scope.find = function() {
        Headers.query(function(headers) {
            $scope.headers = headers;
        });
    };

    $scope.findOne = function() {
        Headers.get({
            headerId: $routeParams.headerId
        }, function(header) {
            $scope.header = header;
        });
    };
    
    $http.get('phones/phones.json').success(function(data) {
        $scope.all = data;
    });

    };
}]);