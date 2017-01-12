/**
 * Created by Jithu.jose on 6/6/2016.
 */
/**
 * Created by Jithu.jose on 3/7/2016.
 */

angular.module('mediaApp.services.crudService', [])
    .service('CRUDService', [
        '$q',
        'RestClient',
        'constants',
        function($q, RestClient, constants){
            this.getSingleCRUDData = function(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    constants.middlewareURL + '/api/public/execute', config)
                    .then(function(crudData){
                        if(crudData.error){
                            deferred.reject(crudData.error);
                        }
                        else{
                            deferred.resolve(crudData.data);
                        }
                    }, function(err){
                        deferred.reject(err);
                    });
                return deferred.promise;
            };

            this.getSingleCRUDContent = function(config){
                var deferred = $q.defer();
                var url = constants.middlewareURL + '/api/public/execute';
                RestClient.postRequestWithoutCache(url, config).then(function(response){
                    if(response.error){
                        deferred.reject(response.error);
                    }
                    else{
                        deferred.resolve(response.data);
                    }
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            };

            this.deleteData = function(config){
                var deferred = $q.defer();
                var url = constants.middlewareURL + '/api/public/execute';
                RestClient.postRequestWithoutCache(url, config).then(function(response){
                    if(response.error){
                        deferred.reject(response.error);
                    }
                    else{
                        deferred.resolve(response.data);
                    }
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            };

        }
    ]);