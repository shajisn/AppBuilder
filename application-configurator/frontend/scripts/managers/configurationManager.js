/**
 * Created by Jithu.jose on 2/8/2016.
 */
angular.module('mediaManager.managers.configurationManager', [])
    .service('ConfigurationManager', [
        '$q',
        'ConfigurationService',
        function($q, ConfigurationService){
            function getProjectConfiguration(projectId){
                var deferred = $q.defer();
                ConfigurationService.getProjectConfiguration({projectId: projectId}).then(function(response){
                    deferred.resolve(response.data);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function saveSection(config, projectId){
                var deferred = $q.defer();
                ConfigurationService.saveSection({
                    section: config,
                    projectId: projectId
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function updateSection(section, projectId){
                var deferred = $q.defer();
                ConfigurationService.updateSection({
                    section: section,
                    projectId: projectId
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function deleteSection(section, projectId){
                var deferred = $q.defer();
                ConfigurationService.deleteSection({
                    id: section.id,
                    projectId: projectId
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function saveField(config, projectId){
                var deferred = $q.defer();
                ConfigurationService.saveField({
                    field: config,
                    projectId: projectId
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function updateField(field, projectId){
                var deferred = $q.defer();
                ConfigurationService.updateField({
                    field: field,
                    projectId: projectId
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function deleteField(field, projectId){
                var deferred = $q.defer();
                ConfigurationService.deleteField({
                    id: field.id,
                    projectId: projectId
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function getSingleFieldForProject(projectId, fieldId){
                var deferred = $q.defer();
                ConfigurationService.getSingleFieldForProject({
                    projectId: projectId,
                    fieldId: fieldId
                }).then(function(response){
                    deferred.resolve(response.data);
                }, function(err){
                    deferred.reject(err)
                });
                return deferred.promise;
            }

            function saveAttribute(field, projectId){
                var deferred = $q.defer();
                ConfigurationService.saveAttribute({
                    projectId: projectId,
                    field: field
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err)
                });
                return deferred.promise;
            }

            function updateAttribute(attribute, projectId){
                var deferred = $q.defer();
                ConfigurationService.updateAttribute({
                    projectId: projectId,
                    attribute: attribute
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err)
                });
                return deferred.promise;
            }

            function deleteAttribute(attribute, projectId){
                var deferred = $q.defer();
                ConfigurationService.deleteAttribute({
                    projectId: projectId,
                    attribute: attribute
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err)
                });
                return deferred.promise;
            }

            function updateParameter(config){
                var deferred = $q.defer();
                ConfigurationService.updateParameter(config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err)
                });
                return deferred.promise;
            }

            function generateProfileConfiguration(projectId){
                var deferred = $q.defer();
                ConfigurationService.generateProfileConfiguration({
                    projectId: projectId
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err)
                });
                return deferred.promise;
            }

            function saveDynamicOptionToListField(config){
                var deferred = $q.defer();
                ConfigurationService.saveDynamicOptionToListField(config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err)
                });
                return deferred.promise;
            }

            function deleteDynamicOptionFromListField(config){
                var deferred = $q.defer();
                ConfigurationService.deleteDynamicOptionFromListField(config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err)
                });
                return deferred.promise;
            }

            return {
                getProjectConfiguration: getProjectConfiguration,

                saveSection: saveSection,
                updateSection: updateSection,
                deleteSection: deleteSection,

                saveField: saveField,
                updateField: updateField,
                deleteField: deleteField,

                getSingleFieldForProject: getSingleFieldForProject,
                saveAttribute: saveAttribute,
                updateAttribute: updateAttribute,
                deleteAttribute: deleteAttribute,

                updateParameter: updateParameter,
                generateProfileConfiguration: generateProfileConfiguration,

                saveDynamicOptionToListField: saveDynamicOptionToListField,
                deleteDynamicOptionFromListField: deleteDynamicOptionFromListField
            };
        }
    ]);