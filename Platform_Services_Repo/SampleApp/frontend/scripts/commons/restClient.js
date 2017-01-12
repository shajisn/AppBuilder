/**
 * Created by Jithu.jose on 3/7/2016.
 */

angular.module('mediaApp.commons.restClient', [])
    .factory('RestClient', [
        '$q',
        '$http',
        function($q, $http){
            var factoryObj = {
                postRequestWithoutCache: function(url, data){
                    var deferred = $q.defer();
                    $http.post(url, data).success(function(response){
                        deferred.resolve(response);
                    }).error(function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },
                getRequestWithoutCache: function(url, data){
                    var deferred = $q.defer();
                    $http.get(url).success(function(response){
                        deferred.resolve(response);
                    }).error(function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                }
            };

            return factoryObj;
        }
    ])
