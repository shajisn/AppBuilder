/**
 * Created by Jithu.jose on 3/7/2016.
 */
/**
 * Created by Jithu.jose on 1/28/2016.
 */
'use strict';

angular.module('mediaApp.states', ['ui.router'])
    .config(['$stateProvider',
        function($stateProvider){
            console.log('in sates config')
            //projectConfiguration.pages.forEach(function(page){
            //    var  stateName = page.type + '_' + page.id;
            //    var stateRoute = page.default ? '/' : '/' + page.type + '-' + page.id;
            //    $stateProvider.state(stateName, {
            //        url: stateRoute,
            //        templateUrl: 'partials/' + page.type,
            //        controller: page.type + 'Ctrl',
            //        resolve: {
            //            pageConfiguration: page
            //        }
            //    });
            //});
        }
    ]);
