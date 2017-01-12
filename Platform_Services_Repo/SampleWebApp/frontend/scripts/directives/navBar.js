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
                        $scope.menu = [];
                        var allMenuObj = {};
                        var choosenMenuObj = {};
                        function populateMenu(){
                            constants.projectConfiguration.nav.forEach(function(menu, index){
                                allMenuObj[menu.id] = menu;
                                if(!menu.parent_nav_menu_id){
                                    choosenMenuObj[menu.id] = menu;
                                    mapPageToMenu(menu);
                                    $scope.menu.push(menu);
                                }
                            });

                            constants.projectConfiguration.nav.forEach(function(menu){
                                if(menu.parent_nav_menu_id){
                                    if(!allMenuObj[menu.parent_nav_menu_id].children){
                                        allMenuObj[menu.parent_nav_menu_id].children = [];
                                    }
                                    allMenuObj[menu.parent_nav_menu_id].children.push(menu);
                                    mapPageToMenu(menu);
                                }
                            });
                        }

                        function mapPageToMenu(menu){
                            var page = constants.projectConfiguration.pages.filter(function(page){
                                return page.id === menu.page_id;
                            })[0];
                            if(!page){
                                return;
                            }
                            if(page.is_first_page){
                                menu.stateName = 'home';
                            }
                            else{
                                menu.stateName = page.type;
                            }
                        }

                        populateMenu();
                    }
                ],
                link: function($scope, element){

                }
            }
        }
    ])