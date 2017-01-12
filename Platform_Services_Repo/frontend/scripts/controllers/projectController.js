/**
 * Created by Jithu.jose on 1/28/2016.
 */
'use strict';
angular.module('mediaManager')
    .controller('ProjectCtrl', [
        '$q',
        '$scope',
        'profiles',
        '$stateParams',
        'CreateForm',
        'ApplicationManager',
        '$localForage',
        'ProjectManager',
        'ProfileManager',
        'RuleManager',
        '$rootScope',
        'CreateRuleForm',
        '$state',
        'ConfigurationManager',
        'CreateFieldForm',
        function($q, $scope, profiles, $stateParams, CreateForm, ApplicationManager, $localForage, ProjectManager, ProfileManager, RuleManager, $rootScope, CreateRuleForm, $state, ConfigurationManager, CreateFieldForm){

            $scope.profiles = profiles;
            $scope.projectId = $stateParams.projectId;
            $scope.tabs = [
                {
                    id: 'general',
                    name: 'General'
                },
                {
                    id: 'profiles',
                    name: 'Profiles'
                },
                {
                    id: 'fields',
                    name: 'Fields'
                }
            ];


            function setSelectedTab(){
                var selectedTab = $scope.tabs[0];
                if($stateParams.sectionId){
                    var selectedTabArr = $scope.tabs.filter(function(tab){
                        return tab.id === $stateParams.sectionId;
                    });
                    if(selectedTabArr.length){
                        selectedTab = selectedTabArr[0];
                    }
                }
                changeTab(selectedTab);
            }
            function changeTab(tab){
                $scope.selectedTab = tab;
                if(tab.id == 'fields'){
                    getProjectConfiguration();
                }
            }
            function getProjectConfiguration(){
                ConfigurationManager.getProjectConfiguration($scope.projectId).then(function(data){
                    if(data){
                        $scope.sections = data.sections || [];
                        $scope.fields = data.fields || [];
                    }
                    else{
                        $scope.sections = [];
                        $scope.fields = [];
                    }
                }, function(err){
                    console.log('Error getting fields and sections :', err);
                })
            }

            $scope.navigateToProject = function(tab){
                $state.go('project', {
                    projectId: $stateParams.projectId,
                    sectionId: tab.id
                }, {reload: true});
            };
            setSelectedTab();

            getCurrentSelectedProject().then(function(project){

                $scope.project = project;
                $scope.applications = project.applications;
                $scope.rules = project.rules;
                $scope.changeApplication($scope.applications[0])
            }, function(err){
                console.error('Error in getting selected project: ', err);
            });


            $scope.addNewApplication = function(){
                var deferred = $q.defer();
                CreateForm.show({
                    promise: deferred.promise
                }, function(applicationObj){
                    if(applicationObj){
                        ApplicationManager.saveApplication(applicationObj, $scope.projectId).then(function(response){
                            if(response.data){
                                saveApplicationDone(response.data);
                                deferred.resolve();
                            }
                            else{
                                console.log('Error in saving application: ', response);
                                deferred.reject(response);
                            }
                        }, function(err){
                            console.error('Error in saving application: ', err);
                            deferred.reject(err);
                        });
                    }
                });
            };
            function saveApplicationDone(applicationObj){
                $scope.project.applications.push(applicationObj);
                $localForage.setItem('currentSelectedProject', JSON.stringify($scope.project));
            }

            $scope.updateApplication = function(application){
                var deferred = $q.defer();
                CreateForm.show({
                    promise: deferred.promise,
                    data: application
                }, function(applicationObj){
                    if(applicationObj){
                        ApplicationManager.updateApplication(applicationObj, $scope.projectId).then(function(response){
                            if(response.data){
                                updateApplicationDone(response.data);
                                deferred.resolve();
                            }
                            else{
                                deferred.reject(response.message);
                                console.log('Error in updating application: ', response);
                            }
                        }, function(err){
                            console.error('Error in updating application: ', err);
                            deferred.reject(err)
                        });
                    }
                });
            };
            function updateApplicationDone(applicationObj){
                $scope.project.applications.forEach(function(application, index){
                    if(applicationObj.id === application.id){
                        $scope.project.applications[index] = applicationObj;
                    }
                });
                $localForage.setItem('currentSelectedProject', JSON.stringify($scope.project));
            }

            $scope.deleteApplication = function(application){
                for(var key in $scope.rules){
                    if($scope.rules[key].applicationId === application.id){
                        return;
                    }
                }

                ApplicationManager.deleteApplication({id: application.id}, $scope.projectId).then(function(response){
                    if(response.data){
                        deleteApplicationDone(response.data);
                    }
                    else{
                        console.log('Error in deleting Application: ', response);
                    }
                }, function(err){
                    console.error('Error in deleting application: ', err);
                });
            };
            function deleteApplicationDone(applicationObj){
                var newArr = $scope.project.applications.filter(function(application){
                    return application.id !== applicationObj.id;
                });
                $scope.project.applications = newArr;
                $scope.applications = newArr;
                $localForage.setItem('currentSelectedProject', JSON.stringify($scope.project));
            }

            $scope.addNewProfile = function(){
                var deferred = $q.defer();
                CreateForm.show({
                    promise: deferred.promise
                }, function(profileObj){
                    if(profileObj){
                        ProfileManager.saveProfile(profileObj, $scope.projectId).then(function(response){
                            if(response.data){
                                saveProfileDone(response.data);
                                deferred.resolve();
                            }
                            else{
                                console.log('Error in saving application: ', response);
                                deferred.reject(response.message);
                            }
                        }, function(err){
                            console.error('Error in saving application: ', err);
                            deferred.reject(err);
                        });
                    }
                });
            };
            function saveProfileDone(profileObj){
                $scope.profiles.push(profileObj);
            }

            $scope.updateProfile = function(profile){
                var deferred = $q.defer();
                CreateForm.show({
                    promise: deferred.promise,
                    data: profile
                }, function(profileObj){
                    if(profileObj){
                        ProfileManager.updateProfile(profileObj, $scope.projectId).then(function(response){
                            if(response.data){
                                updateProfileDone(response.data);
                                deferred.resolve();
                            }
                            else{
                                console.log('Error in saving application: ', response);
                                deferred.reject(response);
                            }
                        }, function(err){
                            console.error('Error in saving application: ', err);
                            deferred.reject(err);
                        });
                    }
                });
            };
            function updateProfileDone(profileConfig){
                $scope.profiles.forEach(function(profile, index){
                    if(profile._id === profileConfig._id){
                        $scope.profiles[index] = profileConfig;
                    }
                })
            }

            $scope.deleteProfile = function(profile){
                ProfileManager.deleteProfile({_id: profile._id}).then(function(response){
                    if(response.data){
                        deleteProfileDone(response.data);
                    }
                    else{
                        console.log('Error in deleting Profile: ', response);
                    }
                }, function(err){
                    console.error('Error in deleting profile: ', err);
                });
            };
            function deleteProfileDone(profileObj){
                var newArr = $scope.profiles.filter(function(profile){
                    return profile._id !== profileObj._id;
                });
                $scope.profiles = newArr;
            }

            $scope.addNewRule = function(){
                var deferred = $q.defer();
                CreateRuleForm.show({
                    promise: deferred.promise,
                    applications: $scope.applications,
                    profiles: $scope.profiles
                }, function(ruleObj){
                    if(ruleObj){
                        RuleManager.saveRule(
                            ruleObj,
                            $scope.projectId
                        ).then(function(response){
                            if(response.data){
                                saveRuleDone(response.data);
                                deferred.resolve();
                            }
                            else{
                                console.log('Error in saving rule: ', response);
                                deferred.reject(response);
                            }
                        }, function(err){
                            console.error('Error in saving rule: ', err);
                            deferred.reject(err);
                        });
                    }
                });
            };
            function saveRuleDone(ruleObj){
                $scope.project.rules.push(ruleObj);
                $localForage.setItem('currentSelectedProject', JSON.stringify($scope.project));
            }

            $scope.updateRule = function(rule){
                var deferred = $q.defer();
                CreateRuleForm.show({
                    promise: deferred.promise,
                    data: rule,
                    applications: $scope.applications,
                    profiles: $scope.profiles
                }, function(ruleObj){
                    if(ruleObj){
                        RuleManager.updateRule(ruleObj, $scope.projectId).then(function(response){
                            if(response.data){
                                updateRuleDone(response.data);
                                deferred.resolve();
                            }
                            else{
                                console.log('Error in saving rule: ', response);
                                deferred.reject(response);
                            }
                        }, function(err){
                            console.error('Error in saving rule: ', err);
                            deferred.reject(err);
                        });
                    }
                });
            };
            function updateRuleDone(ruleConfig){
                $scope.rules.forEach(function(rule, index){
                    if(rule.id === ruleConfig.id){
                        $scope.rules[index] = ruleConfig;
                    }
                })
            }
            $scope.changeProfileInRule = function(rule){
                RuleManager.updateRule(rule, $scope.projectId).then(function(response){
                    if(response.data){
                        updateRuleDone(response.data);
                    }
                    else{
                        console.log('Error in changing rule: ', response);
                    }
                }, function(err){
                    console.error('Error in changing rule: ', err);
                });
            };

            $scope.changeProfileIdInGlobalConfig = function(profileId){
                ProjectManager.changeProfileIdInGlobalConfig(profileId, $scope.projectId).then(function(response){
                    if(response.data){
                        $scope.project.globalConfiguration.profileId = profileId;
                    }
                    else{
                        console.log('Error in changing rule: ', response);
                    }
                }, function(err){
                    console.error('Error in changing rule: ', err);
                });
            };

            $scope.deleteRule = function(rule){
                RuleManager.deleteRule({id: rule.id}, $scope.projectId).then(function(response){
                    if(response.data){
                        deleteRuleDone(response.data);
                    }
                    else{
                        console.log('Error in deleting Rule: ', response);
                    }
                }, function(err){
                    console.error('Error in deleting rule: ', err);
                });
            };
            function deleteRuleDone(ruleObj){
                var newArr = $scope.project.rules.filter(function(rule){
                    return rule.id !== ruleObj.id;
                });
                $scope.project.rules = newArr;
                $scope.rules = newArr;
                $localForage.setItem('currentSelectedProject', JSON.stringify($scope.project));
            }

            $scope.changeApplication = function(application){
                $scope.selectedApplication = application;
            };

            $scope.navigateToProfile = function(profile){
                //$localForage.setItem('currentSelectedProfile', JSON.stringify(profile)).then(function(err){
                if($scope.project.sections && $scope.project.sections.length){
                    var sectionId = $scope.project.sections[0].id;
                    $state.go('profile', {projectId: $scope.projectId, profileId: profile.id, sectionId: sectionId});
                }
                else{
                    console.error('There is no configuration to show the profile')
                }
                //});
            };

            $scope.addNewSection = function(){
                var deferred = $q.defer();
                CreateForm.show({
                    promise: deferred.promise,
                    heading: 'Add New Section'
                }, function(sectionObj){
                    if(sectionObj){
                        ConfigurationManager.saveSection(sectionObj, $scope.projectId).then(function(response){
                            if(response.data){
                                saveSectionDone(response.data);
                                deferred.resolve();
                            }
                            else{
                                console.log('Error in saving section: ', response);
                                deferred.reject(response);
                            }
                        }, function(err){
                            console.error('Error in saving section: ', err);
                            deferred.reject(err);
                        });
                    }
                });
            };
            function saveSectionDone(sectionObj){
                $scope.sections.push(sectionObj);
            }

            $scope.updateSection = function(section){
                var deferred = $q.defer();
                CreateForm.show({
                    promise: deferred.promise,
                    data: section
                }, function(sectionObj){
                    if(sectionObj){
                        ConfigurationManager.updateSection(sectionObj, $scope.projectId).then(function(response){
                            if(response.data){
                                updateSectionDone(response.data);
                                deferred.resolve();
                            }
                            else{
                                deferred.reject(response);
                                console.log('Error in updating section: ', response);
                            }
                        }, function(err){
                            console.error('Error in updating section: ', err);
                            deferred.reject(err)
                        });
                    }
                });
            };
            function updateSectionDone(sectionObj){
                $scope.sections.forEach(function(section, index){
                    if(sectionObj.id === section.id){
                        $scope.sections[index] = sectionObj;
                    }
                });
            }

            $scope.deleteSection = function(section){
                ConfigurationManager.deleteSection({id: section.id}, $scope.projectId).then(function(response){
                    if(response.data){
                        deleteSectionDone(response.data);
                    }
                    else{
                        console.log('Error in deleting section: ', response);
                    }
                }, function(err){
                    console.error('Error in deleting section: ', err);
                });
            };
            function deleteSectionDone(sectionObj){
                var newArr = $scope.sections.filter(function(section){
                    return section.id !== sectionObj.id;
                });
                $scope.sections = newArr;
            }


            $scope.addNewField = function(){
                var deferred = $q.defer();
                CreateFieldForm.show({
                    promise: deferred.promise,
                    heading: 'Add New Field',
                    sections: $scope.sections
                }, function(fieldObj){
                    if(fieldObj){
                        ConfigurationManager.saveField(fieldObj, $scope.projectId).then(function(response){
                            if(response.data){
                                saveFieldDone(response.data);
                                deferred.resolve();
                            }
                            else{
                                console.log('Error in saving field: ', response);
                                deferred.reject(response);
                            }
                        }, function(err){
                            console.error('Error in saving field: ', err);
                            deferred.reject(err);
                        });
                    }
                });
            };
            function saveFieldDone(fieldObj){
                $scope.fields.push(fieldObj);
            }

            $scope.updateField = function(field){
                var deferred = $q.defer();
                CreateFieldForm.show({
                    promise: deferred.promise,
                    data: field,
                    heading: 'Update Field',
                    sections: $scope.sections
                }, function(fieldObj){
                    if(fieldObj){
                        ConfigurationManager.updateField(fieldObj, $scope.projectId).then(function(response){
                            if(response.data){
                                updateFieldDone(response.data);
                                deferred.resolve();
                            }
                            else{
                                deferred.reject(response);
                                console.log('Error in updating field: ', response);
                            }
                        }, function(err){
                            console.error('Error in updating field: ', err);
                            deferred.reject(err)
                        });
                    }
                });
            };
            function updateFieldDone(fieldObj){
                $scope.fields.forEach(function(field, index){
                    if(fieldObj.id === field.id){
                        $scope.fields[index] = fieldObj;
                    }
                });
            }

            $scope.deleteField = function(field){
                ConfigurationManager.deleteField({id: field.id}, $scope.projectId).then(function(response){
                    if(response.data){
                        deleteFieldDone(response.data);
                    }
                    else{
                        console.log('Error in deleting field: ', response);
                    }
                }, function(err){
                    console.error('Error in deleting field: ', err);
                });
            };
            function deleteFieldDone(fieldObj){
                var newArr = $scope.fields.filter(function(field){
                    return field.id !== fieldObj.id;
                });
                $scope.fields = newArr;
            }

            $scope.generateProfileConfiguration = function(){
                ConfigurationManager.generateProfileConfiguration($stateParams.projectId).then(function(resposne){
                    console.log('generateProfileConfiguration SuccessFull', resposne);
                }, function(err){
                    console.log('Error in generating profile configuration: ', err);
                });
            };

            $scope.navigateToField = function(field){
                //$localForage.setItem('currentSelectedField', JSON.stringify(field)).then(function(err){
                    $state.go('field', {projectId: $scope.projectId, fieldId: field.id});
                //});
            };


            function getCurrentSelectedProject(){
                var deferred = $q.defer();
                $localForage.getItem('currentSelectedProject').then(function(project){
                    if(project && $rootScope.previousState.name === 'home'){
                        project = JSON.parse(project);
                        if(project.id === $stateParams.projectId){
                            deferred.resolve(project);
                        }
                        else{
                            deferred.reject();
                        }
                    }
                    else{
                        if($stateParams.projectId){
                            ProjectManager.getSingleProject($stateParams.projectId).then(function(project){
                                deferred.resolve(project);
                            }, function(err){
                                deferred.reject(err);
                            })
                        }
                        else{
                            deferred.reject();
                        }
                    }
                });
                return deferred.promise;
            }

        }
    ]);
