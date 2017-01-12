/**
 * Created by Jithu.jose on 2/2/2016.
 */

angular.module('mediaManager.services.ruleService', [])
    .service('RuleService', [
        '$q',
        'RestClient',
        function($q, RestClient){
            function saveRule(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/rule/save', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function updateRule(rule){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/rule/update', rule).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function deleteRule(rule){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/rule/delete', rule).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            return {
                saveRule: saveRule,
                updateRule: updateRule,
                deleteRule: deleteRule
            };
        }
    ]);

