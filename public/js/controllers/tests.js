'use strict';

angular.module('mean.tests').controller('TestsController', ['$scope', '$routeParams', '$location', 'Global', 'Tests', function ($scope, $routeParams, $location, Global, Tests) {
    $scope.global = Global;
    
    $scope.create = function() {
        var test = new Tests({
            title: this.title,
            headers: this.headers,
            desc: this.desc
        });
        test.$save(function(response) {
            $location.path('tests/' + response._id);
        });

        this.title = '';
        this.headers = [];
        this.desc = "";
    };

   
    
    $scope.remove = function(test) {
        if (test) {
            test.$remove();

            for (var i in $scope.tests) {
                if ($scope.tests[i] === test) {
                    $scope.tests.splice(i, 1);
                }
            }
        }
        else {
            $scope.test.$remove();
            $location.path('tests');
        }
    };

    $scope.update = function() {
        var test = $scope.test;
      /*  if (!test.updated) {
            test.updated = [];
        }
        //test.updated.push(new Date().getTime());*/

        test.$update(function() {
            $location.path('tests/' + test._id);
        });
    };

    $scope.$watch('headers', function(n,o){ 

        var test = $scope.test;
      /*  if (!test.updated) {
            test.updated = [];
        }
        //test.updated.push(new Date().getTime());*/

        test.$update(function() {
            $location.path('tests/' + test._id);
        });
    }) ;

    $scope.find = function() {
        Tests.query(function(tests) {
            $scope.tests = tests;
        });
    };

    $scope.findOne = function() {
        Tests.get({
            testId: $routeParams.testId
        }, function(test) {
            $scope.test = test;
        });
    };
    $scope.addHeader = function(){
        var test = $scope.test;
        var h = { name : $scope.newHeader.name, steps : [] };
        if (!test.headers) test.headers = [];
        test.headers.push(h);
        $scope.update();

    };
    $scope.addStep = function(header, step){
        var s = { seq : step.seq, desc: step.desc};
        header.steps.push(s);
        $scope.update();
    };
}]);