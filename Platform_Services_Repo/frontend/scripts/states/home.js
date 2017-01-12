/**
 * Created by Jithu.jose on 1/28/2016.
 */
'use strict';

angular.module('mediaManager.states.home', ['ui.router'])
    .config(['$stateProvider', function($stateProvider){
        function getAllProjects(){
            return ['$q', 'ProjectManager', function($q, ProjectManager){
                var deferred = $q.defer();
                ProjectManager.getAllProjects().then(function(projects){
                    deferred.resolve(projects);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }];
        }

        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'partials/homePage',
            controller: 'HomePageCtrl',
            resolve: {
                projects: getAllProjects()
            }
        });
    }]);
