/**
 * Created by Jithu.jose on 3/7/2016.
 */

'use strict';

// Declare app level module which depends on views, and components
var mediaApp = angular.module('mediaApp', [
    'ui.router',
    'ui.bootstrap',

    'mediaApp.directives.navBar',
    'mediaApp.directives.navigation',

    'mediaApp.managers.configurationManager',
    'mediaApp.managers.bandManager',
    'mediaApp.managers.formManager',
    'mediaApp.managers.crudManager',

    'mediaApp.services.configurationService',
    'mediaApp.services.bandService',
    'mediaApp.services.formService',
    'mediaApp.services.crudService',

    'mediaApp.commons.restClient',
    'mediaApp.states',
    'LocalForageModule'

]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'constantsProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, constantsProvider){
        $locationProvider.html5Mode(true);
        console.log('in app config')
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
                "ruleId": constantsProvider.ruleId || '71552511581262141201',
                "isMinimalConfig": true
            }),
            dataType: 'json',
            async: false
        }).done(function(response){
            console.log('Configuration taken successfully');
            constantsProvider.set({projectConfiguration: response.data});
            var homePage = response.data.pages.filter(function(page){
                return page.is_first_page;
            })[0];
            $stateProvider.state('home', {
                url: '/',
                templateUrl: 'partials/' + homePage.type,
                controller: homePage.type + 'Ctrl',
                params: {pageId: homePage.id}
            });

            $stateProvider.state('band', {
                url: '/band/:pageId',
                templateUrl: 'partials/band',
                controller: 'bandCtrl'
            });
            $stateProvider.state('form', {
                url: '/form/:pageId?:mode',
                templateUrl: 'partials/form',
                controller: 'formCtrl'
            });
            $stateProvider.state('crud', {
                url: '/crud/:pageId',
                templateUrl: 'partials/crud',
                controller: 'crudCtrl'
            });
        }).error(function(err){
            console.error('error in getting configuration: ', err);
        })

    }
]).run(['$rootScope', function($rootScope){
    console.log('In Run Block');
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        //save the previous state in a rootScope variable so that it's accessible from everywhere
        $rootScope.previousState = from;
        $rootScope.currentState = to;
        $rootScope.fromParams = fromParams;
    });
}]);


