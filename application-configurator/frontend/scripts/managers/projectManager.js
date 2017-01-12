/**
 * Created by Jithu.jose on 1/28/2016.
 */
angular.module('mediaManager.managers.projectManager', [])
    .service('ProjectManager', [
        '$q',
        'ProjectService',
        function($q, ProjectService){
            function saveProject(config){
                var deferred = $q.defer();
                ProjectService.saveProject(config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function updateProject(project){
                var deferred = $q.defer();
                ProjectService.updateProject(project).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function deleteProject(project){
                var deferred = $q.defer();
                ProjectService.deleteProject(project).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function getAllProjects(){
                var deferred = $q.defer();
                ProjectService.getAllProjects().then(function(projects){
                    deferred.resolve(projects);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function getSingleProject(projectId){
                var deferred = $q.defer();
                ProjectService.getSingleProject(projectId).then(function(project){
                    deferred.resolve(project);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function changeProfileIdInGlobalConfig(profileId, projectId){
                var deferred = $q.defer();
                ProjectService.changeProfileIdInGlobalConfig({
                    profileId: profileId,
                    projectId: projectId
                }).then(function(project){
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
