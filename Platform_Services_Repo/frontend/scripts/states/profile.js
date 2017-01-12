/**
 * Created by Jithu.jose on 2/5/2016.
 */
angular.module('mediaManager.states.profile', ['ui.router'])
    .config(['$stateProvider', function($stateProvider){
        $stateProvider.state('profile', {
            url: '/projects/:projectId/profiles/:profileId/:sectionId?fieldId&parentValueId',
            templateUrl: 'partials/profilePage',
            controller: 'ProfileCtrl'
        });
    }]);