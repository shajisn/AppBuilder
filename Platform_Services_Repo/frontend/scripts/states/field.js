/**
 * Created by Jithu.jose on 2/9/2016.
 */

angular.module('mediaManager.states.field', ['ui.router'])
    .config(['$stateProvider', function($stateProvider){
        $stateProvider.state('field', {
            url: '/project/:projectId/field/:fieldId',
            templateUrl: 'partials/fieldPage.html',
            controller: 'FieldCtrl'
        });
    }]);
