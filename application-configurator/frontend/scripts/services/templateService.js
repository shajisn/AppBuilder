/**
 * Created by Jithu.jose on 2/25/2016.
 */

angular.module('mediaManager.services.templateService', [])
    .service('TemplateService', [
        '$q',
        'RestClient',
        function($q, RestClient){
            function getAllTemplates(){
                var deferred = $q.defer();
                RestClient.getRequestWithoutCache('api/templates/getAllTemplates').then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function getSingleTemplate(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    'api/templates/getSingleTemplate',
                    config
                ).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function saveTemplate(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    'api/templates/save',
                    config
                ).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function updateTemplate(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    'api/templates/update',
                    config
                ).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function deleteTemplate(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    'api/templates/delete',
                    config
                ).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function saveField(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    'api/templates/saveField',
                    config
                ).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function updateField(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    'api/templates/updateField',
                    config
                ).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function deleteField(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    'api/templates/deleteField',
                    config
                ).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function generateTemplateConfiguration(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    'api/templates/generateTemplateConfiguration',
                    config
                ).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            return {
                getAllTemplates: getAllTemplates,
                getSingleTemplate: getSingleTemplate,

                saveTemplate: saveTemplate,
                updateTemplate: updateTemplate,
                deleteTemplate: deleteTemplate,

                saveField: saveField,
                updateField: updateField,
                deleteField: deleteField,
                generateTemplateConfiguration: generateTemplateConfiguration
            }
        }
    ]);
