/**
 * Created by Jithu.jose on 2/4/2016.
 */

angular.module('mediaManager.directives.customButton', [])
    .directive('customButton', [function(){
        return{
            restrict: 'E',
            replace: true,
            scope: {
                name: '@',
                customClass: '@',
                onClick: '&'
            },
            templateUrl: '/partials/directives/customButton',
            controller: ['$scope', '$element', function($scope, $element){
                $scope.onBtnClick = function(){
                    var $button = $element[0];
                    var rect = $button.getBoundingClientRect(),
                        x = event.clientX - rect.left,
                        y = event.clientY - rect.top;

                    var $feedback = $button.querySelector('.feedback');

                    TweenMax.set($feedback, {x: x, y: y, scaleX: 0, scaleY: 0, opacity: 1});
                    TweenMax.to($feedback, 1.5, {scaleX: 1.5, scaleY: 1, opacity: 0, ease: Expo.easeOut});
                    setTimeout(function(){
                        $scope.onClick();
                    }, 200);
                }
            }]
        }
    }]);
