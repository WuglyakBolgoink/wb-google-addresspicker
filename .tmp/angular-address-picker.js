/*! angular-address-picker - v0.0.1 - 18 april 2015
* Copyright (c) G. Tomaselli <girotomaselli@gmail.com> 2015; Licensed  
*/
angular.module('ByGiro.addressPicker', [])
.directive('addressPicker', ['$window','$parse', function ($window, $parse) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attrs, ngModel) {
	
	}
  };
}]);
