/**
 * Created by Jithu.jose on 2/2/2016.
 */

angular.module('mediaManager.services.applicationService', [])
    .service('ApplicationService', [
        '$q',
        'RestClient',
        function($q, RestClient){
            function saveApplication(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/applications/save', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function updateApplication(application){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/applications/update', application).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function deleteApplication(application){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/applications/delete', application).then(function(response){
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

