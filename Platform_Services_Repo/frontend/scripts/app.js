'use strict';

// Declare app level module which depends on views, and components
angular.module('mediaManager', [
    'ui.router',
    'ui.bootstrap',
    'mediaManager.states.home',
    'mediaManager.states.project',
    'mediaManager.states.profile',
    'mediaManager.states.field',
    'mediaManager.states.templates',

    'mediaManager.directives.customButton',
    'mediaManager.directives.navTabs',
    'mediaManager.directives.navBar',

    'mediaManager.managers.projectManager',
    'mediaManager.managers.profileManager',
    'mediaManager.managers.applicationManager',
    'mediaManager.managers.ruleManager',
    'mediaManager.managers.configurationManager',
    'mediaManager.managers.templateManager',

    'mediaManager.services.createForm',
    'mediaManager.services.createRuleForm',
    'mediaManager.services.createFieldForm',
    'mediaManager.services.createAttributeForm',
    'mediaManager.services.createSelectOptionForm',
    'mediaManager.services.createTemplateForm',
    'mediaManager.services.createTemplateFieldForm',
    'mediaManager.services.projectService',
    'mediaManager.services.profileService',
    'mediaManager.services.applicationService',
    'mediaManager.services.ruleService',
    'mediaManager.services.configurationService',
    'mediaManager.services.templateService',

    'mediaManager.commons.restClient',
    'LocalForageModule'
]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise(function($injector, $location){
      $injector.invoke(['$state', function($state){
        //$state.go('home');
      }]);
    });

    $stateProvider.state('404', {
      templateUrl: 'partials/notFound'
    });

  }
]).run(['$rootScope', function($rootScope){
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        //save the previous state in a rootScope variable so that it's accessible from everywhere
        $rootScope.previousState = from;
        $rootScope.currentState = to;
        $rootScope.setDefaultTab();
    });
}]);

