'use strict';

angular.module('mean').directive('contenteditable',[ '$scope', 'Global',function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			 // view -> model
            iElm.bind('blur', function() {
                $scope.$apply(function() {
                    controller.$setViewValue(iElm.html());
                });
            });

            // model -> view
            controller.render = function(value) {
                iElm.html(value);
            };

            // load init value from DOM
            controller.$setViewValue(iElm.html());

            iElm.bind('keydown', function(event) {
                console.log("keydown " + event.which);
                var esc = event.which == 27,
                    el = event.target;

                if (esc) {
                        console.log("esc");
                        controller.$setViewValue(iElm.html());
                        el.blur();
                        event.preventDefault();                        
                    }
                    
            });	
		}
	};
}]);