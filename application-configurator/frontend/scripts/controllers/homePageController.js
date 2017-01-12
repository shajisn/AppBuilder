/**
 * Created by Jithu.jose on 1/28/2016.
 */
'use strict';
angular.module('mediaManager')
    .controller('HomePageCtrl', [
        '$q',
        '$scope',
        'projects',
        'CreateForm',
        'ProjectManager',
        '$localForage',
        '$state',
        function ($q, $scope, projects, CreateForm, ProjectManager, $localForage, $state) {
            $scope.projects = projects;
            $scope.addNewProject = function(){
                var deferred = $q.defer();
                CreateForm.show({
                    promise: deferred.promise,
                    heading: 'Add New Project'
                }, function(projectObj){
                    if(projectObj){
                        ProjectManager.saveProject(projectObj).then(function(response){
                            if(response.data){
                                $scope.projects.push(response.data);
                                deferred.resolve();
                            }
                            else{
                                deferred.reject(response.message);
                            }
                        }, function(err){
                            deferred.reject(err);
                            console.error('Error in saving project: ', err)
                        });
                    }
                });
            };

            $scope.updateProject = function(project){
                var deferred = $q.defer();
                CreateForm.show({
                    promise: deferred.promise,
                    data: project,
                    heading: 'Update Project'
                }, function(projectObj){
                    if(projectObj){
                        ProjectManager.updateProject(projectObj).then(function(response){
                            injectUpdatedProject(response.data);
                            deferred.resolve();
                        }, function(err){
                            deferred.reject(err);
                            console.error('Error in saving project: ', err)
                        });
                    }
                    else{
                        deferred.resolve();
                    }
                });
            };

            function injectUpdatedProject(project){
                $scope.projects.forEach(function(obj, index){
                    if(project._id === obj._id){
                        $scope.projects[index] = project;
                    }
                });
            }

            $scope.deleteProject = function(project){
                ProjectManager.deleteProject({_id: project._id}).then(function(response){
                    deleteProjectFromConfiguration(response._id);
                }, function(err){
                    console.error('Error in deleting project: ', err);
                });
            };

            $scope.navigateToProject = function(project){
                $localForage.setItem('currentSelectedProject', JSON.stringify(project)).then(function(){
                    $state.go('project', {projectId: project.id, sectionId: 'general'});
                });
            }

            function deleteProjectFromConfiguration(_id){
                var newArr = $scope.projects.filter(function(project){
                    return _id !== project._id
                });
                $scope.projects = newArr;
            }
        }
    ]);
