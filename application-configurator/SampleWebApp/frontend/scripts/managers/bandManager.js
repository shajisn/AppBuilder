/**
 * Created by Jithu.jose on 3/7/2016.
 */

angular.module('mediaApp.managers.bandManager', [])
    .factory('BandManager', [
        '$q',
        'BandService',
        function($q, BandService){
            var factoryObj = {
                getSingleBandDataWithConfig: function(bandId){
                    var deferred = $q.defer();
                    BandService.getSingleBandDataWithConfig({id: bandId}).then(function(bandData){
                        deferred.resolve(bandData);
                    }, function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                }
            };

            return factoryObj;
        }
    ]);

