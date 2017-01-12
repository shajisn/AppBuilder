/**
 * Created by Jithu.jose on 2/8/2016.
 */

angular.module('mediaManager.directives.navTabs', [])
    .directive('navTabs', [function(){
        return{
            restrict: 'E',
            replace: true,
            scope: {
                customClass: '@',
                subCustomClass: '@',
                tabs: '=',
                defaultTab: '='
            },
            templateUrl: '/partials/directives/navTabs',
            controller: ['$scope', '$element', function($scope, $element){
                $scope.onTabClick = function(tab){
                    $scope.selectedTab = tab;
                    if(tab.onClick){
                        tab.onClick.apply('',[{id: tab.id, name:tab.name}]);
                    }
                };
                $scope.onTabClick($scope.defaultTab);
            }]
        }
    }]);
