(function() {
    /*! wb-google-addresspicker
     * Licensed MIT
     */
    angular
        .module('WB.GAddressPicker', [])
        .directive('wbGoogleAddresspicker', WbGoogleAddresspickerDirective);

    /**
     * @ngInject
     */
    function WbGoogleAddresspickerDirective() {
        return {
            scope: {
                options: '=gapOptions',
                gapModel: '=gapModel',
                ngModel: '=?'
            },
            restrict: 'A',
            controller: _directiveController
        };

        function _directiveController($scope, $timeout, $element, $attrs, $parse) {
            $element.addressPickerByGiro($scope.options)
                .on('selected.addressPickerByGiro', function(eve, data) {
                    if (!data.cleanData) {
                        return;
                    }

                    if ($attrs.ngModel) {
                        $scope.ngModel = data.cleanData.formatted_address;
                    }

                    if ($attrs.gapModel) {
                        $scope.gapModel = data.cleanData;
                    }

                    if ($scope.options.addressComponentsKey) {
                        if ($scope.$parent.model) {
                            var otherKey = $scope.options.addressComponentsKey,
                                modelGetter = $parse(otherKey);

                            // This returns a function that lets us set the value of the ng-model binding expression:
                            var modelSetter = modelGetter.assign;

                            // This is how you can use it to set the value on the given scope.
                            modelSetter($scope.$parent.model, data.cleanData);
                        }
                    }
                    $timeout();
                });
        }
    }
})();
