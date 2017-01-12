/**
 * Created by Jithu.jose on 2/25/2016.
 */

angular.module('mediaManager.managers.templateManager', [])
    .service('TemplateManager', [
        '$q',
        'TemplateService',
        function($q, TemplateService){
            function getAllTemplates(){
                var deferred = $q.defer();
                TemplateService.getAllTemplates().then(function(response){
                    if(response.data){
                        deferred.resolve(response.data);
                    }
                    else{
                        deferred.reject(response);
                    }
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function getSingleTemplate(templateId, fieldId){
                var deferred = $q.defer();
                TemplateService.getSingleTemplate({
                    id: templateId,
                    parentFieldId: fieldId
                }).then(function(response){
                    if(response.data){
                        deferred.resolve(response.data);
                    }
                    else{
                        deferred.reject(response);
                    }
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function saveTemplate(config){
                var deferred = $q.defer();
                TemplateService.saveTemplate(config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function updateTemplate(config){
                var deferred = $q.defer();
                TemplateService.updateTemplate(config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function deleteTemplate(config){
                var deferred = $q.defer();
                TemplateService.deleteTemplate(config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function saveField(config){
                var deferred = $q.defer();
                TemplateService.saveField(config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function updateField(config){
                var deferred = $q.defer();
                TemplateService.updateField(config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function deleteField(config){
                var deferred = $q.defer();
                TemplateService.deleteField(config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function generateTemplateConfiguration(templateId){
                var deferred = $q.defer();
                TemplateService.generateTemplateConfiguration({id: templateId}).then(function(response){
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
