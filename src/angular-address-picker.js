(function() {
    /*! ng-google-address-picker
     * Copyright (c) G. Tomaselli <girotomaselli@gmail.com> 2015; Licensed MIT
     */
    angular.module('ByGiro.addressPicker', [])
        .directive('bgapAddressPicker', ['$window', '$parse', '$compile', function($window, $parse, $compile) {

            contrFunction = ['$scope', '$timeout', '$element', '$attrs', '$parse', function($scope, $timeout, $element, $attrs, $parse) {

                $element.addressPickerByGiro($scope.options)
                    .on('selected.addressPickerByGiro', function(eve, data) {

                        if (!data.cleanData) return;

                        if ($attrs.ngModel) {
                            $scope.ngModel = data.cleanData.formatted_address;
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
            }];

            return ({
                scope: {
                    options: "=bgapOptions",
                    ngModel: "=?"
                },
                restrict: "A",
                controller: contrFunction
            });
        }]);
})();
