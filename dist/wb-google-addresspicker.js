(function() {
    angular
        .module('WB.GAddressPicker', [])
        .directive('wbGoogleAddresspicker', WbGoogleAddresspickerDirective);

    function WbGoogleAddresspickerDirective() {
        _directiveController.$inject = ['$scope', '$timeout', '$element', '$attrs', '$parse'];
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

                            var modelSetter = modelGetter.assign;

                            modelSetter($scope.$parent.model, data.cleanData);
                        }
                    }
                    $timeout();
                });
        }
    }
})();
