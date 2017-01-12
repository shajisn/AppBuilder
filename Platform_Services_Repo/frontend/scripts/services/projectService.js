/**
 * Created by Jithu.jose on 1/28/2016.
 */
angular.module('mediaManager.services.projectService', [])
    .service('ProjectService', [
        '$q',
        'RestClient',
        function($q, RestClient){

            function saveProject(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/project/save', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function updateProject(project){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/project/update', project).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function deleteProject(project){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/project/delete', project).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function getAllProjects(){
                var deferred = $q.defer();
                RestClient.getRequestWithoutCache('api/project/getAllProjects').then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function getSingleProject(projectId){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/project/getSingleProject', {projectId: projectId}).then(function(project){
                    deferred.resolve(project);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function changeProfileIdInGlobalConfig(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    'api/project/changeProfileIdInGlobalConfig',
                    config
                ).then(function(project){
                    deferred.resolve(project);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }


            return {
                saveProject: saveProject,
                updateProject: updateProject,
                deleteProject: deleteProject,

                getAllProjects: getAllProjects,
                getSingleProject: getSingleProject,

                changeProfileIdInGlobalConfig: changeProfileIdInGlobalConfig
            };
        }
    ]);

