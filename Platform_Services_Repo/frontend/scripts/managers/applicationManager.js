/**
 * Created by Jithu.jose on 2/2/2016.
 */

angular.module('mediaManager.managers.applicationManager', [])
    .service('ApplicationManager', [
        '$q',
        'ApplicationService',
        function($q, ApplicationService){
            function saveApplication(config, projectId){
                var deferred = $q.defer();
                ApplicationService.saveApplication({
                    application: config,
                    projectId: projectId
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function updateApplication(application, projectId){
                var deferred = $q.defer();
                ApplicationService.updateApplication({
                    application: application,
                    projectId: projectId
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function deleteApplication(application, projectId){
                var deferred = $q.defer();
                ApplicationService.deleteApplication({
                    application: application,
                    projectId: projectId
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }


            return {
                saveApplication: saveApplication,
                updateApplication: updateApplication,
                deleteApplication: deleteApplication
            };
        }
    ]);