(function() {
	angular.module('demoApp', ['ByGiro.addressPicker']).controller('demoCtrl', [
		'$scope','$window', function($scope, $window) {
			$scope.address = {};	

			$scope.addressPickerOptions = {
				distanceWidget: true,
				addressComponents: true
			};
		}
	]);
})();