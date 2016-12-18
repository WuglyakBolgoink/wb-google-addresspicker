(function() {
    'use strict';

    angular
        .module('demoApp', ['ByGiro.addressPicker'])
        .controller('demoCtrl', ['$scope', function($scope) {
            $scope.address = '';

            $scope.addressPickerOptions = {
                distanceWidget: true,
                addressComponents: true
            };
        }
    ]);
})();
