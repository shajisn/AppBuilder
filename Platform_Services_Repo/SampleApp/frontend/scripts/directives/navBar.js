/**
 * Created by Jithu.jose on 3/7/2016.
 */

angular.module('mediaApp.directives.navBar', [])
    .directive('navBar', [
        function(){
            return{
                restrict: 'E',
                replace: true,
                scope: {

                },
                templateUrl : '/partials/directives/navBar',
                controller: [
                    '$scope',
                    '$state',
                    '$rootScope',
                    'ConfigurationManager',
                    'constants',
                    function($scope, $state, $rootScope, ConfigurationManager, constants){
                        function populateNavBar(){
                            ConfigurationManager.getConfig(constants.navbar_config_key).then(function(config){
                                $scope.tabs = config;
                            }, function(err){
                                console.error('Error in getting nav config: ', err);
                            });
                        }
                        populateNavBar();
                    }
                ],
                link: function($scope, element){

                }
            }
        }
    ])