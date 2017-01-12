/**
 * Created by Jithu.jose on 3/7/2016.
 */

angular.module('mediaApp.managers.vodManager', [])
    .factory('VODManager', [
        '$q',
        'VODService',
        function($q, VODService){
            var factoryObj = {
                getSingleBandDataWithConfig: function(bandId){
                    var deferred = $q.defer();
                    VODService.getSingleBandDataWithConfig({id: bandId}).then(function(bandData){
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

