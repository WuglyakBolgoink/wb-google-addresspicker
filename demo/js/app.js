(function() {
    'use strict';

    angular
        .module('demoApp', [
            'WB.GAddressPicker'
        ])
        .controller('demoCtrl', DemoController);

    function DemoController() {
        var ctrl = this;

        ctrl.address = '';
        ctrl.addressFull = null;

        ctrl.addressPickerOptions = {
            distanceWidget: true,
            addressComponents: true,
            elements: {
                map: true,
                lat: true,
                lng: true,
                street_number: true,
                route: true,
                locality: true,
                administrative_area_level_3: true,
                administrative_area_level_2: true,
                administrative_area_level_1: true,
                country: true,
                postal_code: true,
                type: true
            }
        };
    }
})();
