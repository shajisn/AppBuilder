/**
 * Created by Jithu.jose on 3/7/2016.
 */

'use strict';

// Declare app level module which depends on views, and components
angular.module('mediaApp', [
    'ui.router',
    'ui.bootstrap',

    'mediaApp.states.homePage',

    'mediaApp.directives.navBar',

    'mediaApp.managers.configurationManager',
    'mediaApp.managers.vodManager',
    'mediaApp.managers.userManager',

    'mediaApp.services.configurationService',
    'mediaApp.services.vodService',
    'mediaApp.services.userService',

    'mediaApp.commons.restClient',

    'LocalForageModule'
]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'constantsProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, constantsProvider){
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise(function($injector, $location){
            $injector.invoke(['$state', function($state){
                //$state.go('home');
            }]);
        });

        $stateProvider.state('404', {
            templateUrl: 'partials/notFound'
        });





        jQuery.ajax({
            url: '/api/configuration/getProjectConfiguration',
            type: 'post',
            contentType: 'application/json',
            processData: false,
            data: JSON.stringify({
                "projectId": constantsProvider.projectId || '02090433244256412110',
                "ruleId": constantsProvider.ruleId || '71552511581262141201'
            }),
            dataType: 'json',
            async: false
        }).done(function(response){
            console.log('Configuration saved successfully');
        }).error(function(err){
            console.error('error in getting configuration: ', err);
        })

    }
]).run(['$rootScope', function($rootScope){
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        //save the previous state in a rootScope variable so that it's accessible from everywhere
        $rootScope.previousState = from;
        $rootScope.currentState = to;
    });
}]);


