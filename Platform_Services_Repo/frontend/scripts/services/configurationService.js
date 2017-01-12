/**
 * Created by Jithu.jose on 2/8/2016.
 */

angular.module('mediaManager.services.configurationService', [])
    .service('ConfigurationService', [
        '$q',
        'RestClient',
        function($q, RestClient){
            function getProjectConfiguration(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('/api/configuration/getProjectConfiguration', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function saveSection(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('/api/configuration/saveSection', config).then(function(section){
                    deferred.resolve(section);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function updateSection(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/configuration/updateSection', config).then(function(section){
                    deferred.resolve(section);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function deleteSection(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/configuration/deleteSection', config).then(function(section){
                    deferred.resolve(section);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function saveField(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('/api/configuration/saveField', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function updateField(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/configuration/updateField', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function deleteField(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/configuration/deleteField', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function getSingleFieldForProject(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/configuration/getSingleFieldForProject', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function saveAttribute(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/configuration/saveAttribute', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function updateAttribute(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/configuration/updateAttribute', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function deleteAttribute(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/configuration/deleteAttribute', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function updateParameter(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/configuration/updateParameter', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function generateProfileConfiguration(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/configuration/generateProfileConfiguration', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function saveDynamicOptionToListField(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/configuration/saveDynamicOptionToListField', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function deleteDynamicOptionFromListField(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/configuration/deleteDynamicOptionFromListField', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
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