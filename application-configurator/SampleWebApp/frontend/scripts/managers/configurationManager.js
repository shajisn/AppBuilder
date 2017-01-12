/**
 * Created by Jithu.jose on 3/7/2016.
 */

angular.module('mediaApp.managers.configurationManager', [])
    .factory('ConfigurationManager', [
        '$q',
        'ConfigurationService',
        function($q, ConfigurationService){
            var factoryObj = {
                getPageConfiguration: function(pageId){
                    var deferred = $q.defer();
                    ConfigurationService.getPageConfiguration({id: pageId}).then(function(configuration){
                        deferred.resolve(configuration)
                    }, function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },
                getConfig: function(key){
                    var deferred = $q.defer();
                    ConfigurationService.getConfig({key: key}).then(function(config){
                        deferred.resolve(config)
                    }, function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                }
            };

            return factoryObj;
        }
    ]);

