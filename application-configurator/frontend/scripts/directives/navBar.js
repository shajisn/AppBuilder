/**
 * Created by Jithu.jose on 2/24/2016.
 */
angular.module('mediaManager.directives.navBar', [])
    .directive('navBar', [
        function(){
            return{
                restrict: 'E',
                replace: true,
                scope: {

                },
                templateUrl : '/partials/directives/navBar',
                controller: ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope){
                    $scope.tabs = [
                        {
                            id: 'projectPool',
                            name: 'Project Pool',
                            action: 'home',
                            states: ['home', 'project', 'profile', 'field']
                        },
                        {
                            id: 'templates',
                            name: 'Templates',
                            action: 'templates',
                            states: ['templates', 'template']
                        }
                    ];
                    $rootScope.setDefaultTab = function(){
                        var currentTab = $scope.tabs.filter(function(tab){
                            return tab.states.indexOf($rootScope.currentState.name) !== -1;
                        });
                        if(currentTab.length){
                            $scope.selectedTab = currentTab[0];
                        }
                    };
                    $scope.changeNabBarTab = function(tab){
                        $scope.selectedTab = tab;
                        $state.go(tab.action);
                    };
                }],
                link: function($scope, element){

                }
            }
        }
    ])