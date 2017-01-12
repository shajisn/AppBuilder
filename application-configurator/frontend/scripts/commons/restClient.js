/**
 * Created by Jithu.jose on 1/28/2016.
 */
angular.module('mediaManager.commons.restClient', [])
    .service('RestClient', [
        '$q',
        '$http',
        function($q, $http){
            function postRequestWithoutCache(url, data){
                var deferred = $q.defer();
                $http.post(url, data).success(function(response){
                    deferred.resolve(response);
                }).error(function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function getRequestWithoutCache(url, data){
                var deferred = $q.defer();
                $http.get(url).success(function(response){
                    deferred.resolve(response);
                }).error(function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            return {
                postRequestWithoutCache: postRequestWithoutCache,
                getRequestWithoutCache: getRequestWithoutCache
            }
        }
    ])
