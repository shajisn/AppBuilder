/**
 * Created by Jithu.jose on 3/7/2016.
 */

angular.module('mediaApp.services.vodService', [])
    .service('VODService', [
        '$q',
        'RestClient',
        function($q, RestClient){
            this.getSingleBandDataWithConfig = function(data){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    '/api/vod/getSingleBandDataWithConfig',
                    data
                ).then(function(bandData){
                    deferred.resolve(bandData);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
        }
    ]);