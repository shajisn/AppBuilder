/**
 * Created by Jithu.jose on 3/7/2016.
 */

angular.module('mediaApp.services.bandService', [])
    .service('BandService', [
        '$q',
        'RestClient',
        function($q, RestClient){
            this.getSingleBandDataWithConfig = function(data){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    '/api/band/getSingleBandDataWithConfig',
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