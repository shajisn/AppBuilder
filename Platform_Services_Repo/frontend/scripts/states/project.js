/**
 * Created by Jithu.jose on 1/28/2016.
 */
'use strict';

angular.module('mediaManager.states.project', ['ui.router'])
    .config(['$stateProvider', function($stateProvider){
        function getAllProfilesForSingleProject(){
            return ['$q', 'ProfileManager', '$stateParams',
                function($q, ProfileManager, $stateParams){
                    var deferred = $q.defer();
                    if($stateParams.projectId){
                        ProfileManager.getAllProfilesForSingleProject($stateParams.projectId).then(function(response){
                            deferred.resolve(response);
                        }, function(err){
                            console.log('Error in getting profiles for projectId: ', $stateParams.projectId);
                            deferred.reject(err);
                        });
                    }
                    else{
                        deferred.reject();
                    }

                    return deferred.promise;
                }
            ];
        }
        $stateProvider.state('project', {
            url: '/project/:projectId?sectionId',
            templateUrl: 'partials/project',
            controller: 'ProjectCtrl',
            resolve: {
                profiles: getAllProfilesForSingleProject()
            }
        });
    }])
