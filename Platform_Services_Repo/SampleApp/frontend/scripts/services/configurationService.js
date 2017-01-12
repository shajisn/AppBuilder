/**
 * Created by Jithu.jose on 3/7/2016.
 */

angular.module('mediaApp.services.configurationService', [])
    .service('ConfigurationService', [
        '$q',
        'RestClient',
        function($q, RestClient){
            this.getPageConfiguration = function(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    '/api/configuration/getPageConfiguration',
                    config
                ).then(function(configuration){
                    deferred.resolve(configuration);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            this.getConfig = function(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    '/api/configuration/getConfig',
                    config
                ).then(function(configuration){
                    deferred.resolve(configuration);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
        }
    ]);