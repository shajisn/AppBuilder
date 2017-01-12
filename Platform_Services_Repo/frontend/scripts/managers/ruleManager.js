/**
 * Created by Jithu.jose on 2/2/2016.
 */

angular.module('mediaManager.managers.ruleManager', [])
    .service('RuleManager', [
        '$q',
        'RuleService',
        function($q, RuleService){
            function saveRule(config, projectId){
                var deferred = $q.defer();
                RuleService.saveRule({
                    rule: config,
                    projectId: projectId
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function updateRule(rule, projectId){
                var deferred = $q.defer();
                RuleService.updateRule({
                    rule: rule,
                    projectId: projectId
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function deleteRule(rule, projectId){
                var deferred = $q.defer();
                RuleService.deleteRule({
                    rule: rule,
                    projectId: projectId
                }).then(function(response){
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