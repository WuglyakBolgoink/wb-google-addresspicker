/*! angular-address-picker - v0.0.1 - 18 april 2015
* Copyright (c) G. Tomaselli <girotomaselli@gmail.com> 2015; Licensed  
*/
angular.module('ByGiro.addressPicker', ['ui.bootstrap'])
.directive('bgapAddressPicker', ['$window','$parse','$compile', function ($window, $parse, $compile) {
	
	// I augment the template element DOM structure before linking.
	function compile( tElement, tAttributes ) {

		// Add new attributes
		tElement.attr( 'typeahead-min-length', '3' );
		tElement.attr( 'typeahead', 'address for address in getLocation($viewValue)' );
		tElement.attr( 'typeahead-on-select', 'addressSelected($item, $model, $label)' );

		if(!tAttributes.ngModel){
			tElement.attr( 'ng-model', 'formattedAddress' );
		}
		
		var sublink = $compile( tElement, null, 1500 );

		function link( scope, element, attributes, _, transclude ) {
			
			transclude(
				function( content ) {
					element.append( content );
				}
			);
		
			var bg = (typeof jQuery != 'undefined') ? jQuery : angular.element;	
			var options = {};
			if(attributes.bgapOptions){
				options = scope.$parent[attributes.bgapOptions];
			}

			bg(element).addressPickerByGiro(options).on('selected.addressPickerByGiro', function(eve, data){
				var value = data.cleanData;
				if(!options.addressComponents){
					value = data.cleanData.formatted_address;
				}
				
				// update the scope
				var phase = scope.$root.$$phase;
				if (phase == '$apply' || phase == '$digest') {
					scope.address = value;	
				} else {
					scope.$apply(function(){
						scope.address = value;
					});
				}
			});
			
			// we get a promise
			scope.getLocation = function(val) {
				return bg(element).addressPickerByGiro('source', val).then(function(response){
					return response;
				});
			};	
		
			scope.addressSelected = function($item, $model, $label){
				bg(element).addressPickerByGiro('updater', $item);
			};
			
			sublink( scope );
		}

		return( link );
	}

	return({
		compile: compile,
		priority: 1500,
		restrict: "A",
		scope: {
			address: "=bgapAddress"
		},
		terminal: true,
		transclude: true
	});
}]);
