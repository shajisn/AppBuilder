/**
 * Created by Jithu.jose on 2/5/2016.
 */

angular.module('mediaManager')
    .controller('ProfileCtrl', [
        '$q',
        '$scope',
        '$stateParams',
        '$rootScope',
        '$localForage',
        'ProfileManager',
        'ProjectManager',
        'CreateForm',
        '$location',
        '$state',
        'TemplateManager',
        function($q, $scope, $stateParams, $rootScope, $localForage, ProfileManager, ProjectManager, CreateForm, $location, $state, TemplateManager){

            $scope.profileId = $stateParams.profileId;
            function getCurrentSelectedProfile(){
                var deferred = $q.defer();
                $localForage.getItem('currentSelectedProfile').then(function(profile){
                    if(profile && $rootScope.previousState.name === 'project'){
                        profile = JSON.parse(profile);
                        if((profile.id === $stateParams.profileId) && (profile.projectId === $stateParams.projectId)){
                            deferred.resolve(profile);
                        }
                        else{
                            deferred.reject();
                        }
                    }
                    else{
                        if($stateParams.profileId && $stateParams.projectId){
                            ProfileManager.getSingleProfile($stateParams.profileId).then(function(profile){
                                deferred.resolve(profile);
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

            function getCurrentSelectedProject(){
                var deferred = $q.defer();
                $localForage.getItem('currentSelectedProject').then(function(project){
                    if(project && $rootScope.previousState.name === 'project'){
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

            function getValueKeyObjectArr(){
                var deferred = $q.defer();
                $localForage.getItem('currentValueIdKeyObjectArr').then(function(valueIdKeyObjectArr){
                    if(valueIdKeyObjectArr){
                        valueIdKeyObjectArr = JSON.parse(valueIdKeyObjectArr);
                    }
                    deferred.resolve(valueIdKeyObjectArr);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function getAllTemplates(){
                var deferred = $q.defer();
                TemplateManager.getAllTemplates().then(function(templates){
                    deferred.resolve(templates);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            $q.all([
                getCurrentSelectedProfile(),
                getCurrentSelectedProject(),
                getValueKeyObjectArr(),
                getAllTemplates()
            ]).then(function(responseArr){
                initValues(responseArr);
            }, function(err){
                console.log('Error in getting profile and project: ', err);
            });

            function removeUnwantedValuesInValueIdKeyObjectArr(parentId){
                var index = 0;
                var parentFieldId = parentId;
                for(var key in $scope.valueIdKeyObjectArr){
                    var valueIdKeyObject = $scope.valueIdKeyObjectArr[key];
                    if(parentFieldId === valueIdKeyObject.parentFieldId){
                        parentFieldId = valueIdKeyObject.fieldId;
                        $scope.valueIdKeyObjectArr = spliceObjectFromArray($scope.valueIdKeyObjectArr, index);
                        removeUnwantedValuesInValueIdKeyObjectArr(parentFieldId);
                        break;
                    }
                    index++;
                }
            }


            function navigateToInitialProfile(sectionId){
                $state.go('profile', {
                    projectId: $stateParams.projectId,
                    profileId: $stateParams.profileId,
                    sectionId: sectionId,
                    fieldId: '',
                    parentValueId: ''
                }, {reload: true});
            }

            function initValues(responseArr){
                $scope.profile = responseArr[0];
                $scope.project = responseArr[1];
                $scope.valueIdKeyObjectArr = responseArr[2] || [];
                $scope.parentfield = {};


                if((!responseArr[2] || (responseArr[2] && !responseArr[2].length)) &&
                    (($stateParams.fieldId))){
                    navigateToInitialProfile($stateParams.sectionId);
                    return;
                }
                else if(responseArr[2] && responseArr[2].length &&
                    (!$stateParams.fieldId)){
                    $scope.valueIdKeyObjectArr = [];
                }
                $scope.templates = responseArr[3];
                removeUnwantedValuesInValueIdKeyObjectArr($stateParams.fieldId);
                $scope.profileId = $stateParams.profileId;
                var sections = JSON.parse(JSON.stringify($scope.project.sections));
                $scope.sections = sections;
                $scope.fieldId = $location.search().fieldId;
                $scope.project.fields.forEach(function(field){
                    if(!field.valueList){
                        field.valueList = {};
                        field.valueList[$stateParams.profileId] = [];
                    }
                    else if(!field.valueList[$stateParams.profileId]){
                        field.valueList[$stateParams.profileId] = [];
                    }
                });
                var selectedSection = sections.filter(function(section){
                    return section.id === $stateParams.sectionId;
                })[0];
                $scope.setSelectedSection(selectedSection)
            }

            $scope.changeSection = function(section){
                navigateToInitialProfile(section.id);
            };

            $scope.setSelectedSection = function(section){
                $scope.selectedSection = section;

                if(!$scope.fieldId){
                    $scope.seclectedFields = $scope.project.fields.filter(function(field){
                        return !field.parentId && field.sectionId === section.id;
                    });
                }
                else{
                    $scope.parentfield = $scope.project.fields.filter(function(field){
                        return field.id === $scope.fieldId;
                    })[0];
                    var children = [];
                    $scope.parentfield.attributes.forEach(function(attribute){
                        children.push(attribute.id);
                    });
                    $scope.seclectedFields = $scope.project.fields.filter(function(field){
                        return children.indexOf(field.id) !== -1
                    });
                }
                $scope.seclectedFields = JSON.parse(JSON.stringify($scope.seclectedFields));
                $scope.seclectedFields.forEach(function(field){
                     if(field.valueList && field.valueList[$stateParams.profileId]){
                         var newArr = field.valueList[$stateParams.profileId].filter(function(valueObj){
                             return valueObj.parentValueId === $stateParams.parentValueId;
                         });
                         field.valueList[$stateParams.profileId] = newArr;
                     }
                });
                var currentElement = $scope.profile.configuration;
                $scope.valueIdKeyObjectArr.forEach(function(valueKeyObj){
                    if(!valueKeyObj.isRepeatable){
                        currentElement = currentElement[valueKeyObj.key];
                    }
                    else{
                        currentElement = currentElement[valueKeyObj.key].filter(function(currentElementObj){
                            return currentElementObj._value_id === valueKeyObj._value_id;
                        });
                        currentElement = currentElement[0];
                    }
                });
                $scope.seclectedFields.forEach(function(field){
                    if(typeof currentElement[field.key] !== 'object'){
                        field.value = currentElement[field.key];
                    }
                });
            };

            $scope.addValueToComplexField = function(field){
                var deferred = $q.defer();
                CreateForm.show({
                    promise: deferred.promise,
                    heading: 'Add Complex Value Name'
                }, function(valueObj){
                    if(valueObj){
                        ProfileManager.addValueToComplexField(
                            valueObj.name,
                            $stateParams.projectId,
                            $stateParams.profileId,
                            $stateParams.parentValueId,
                            field.id,
                            $scope.valueIdKeyObjectArr || []
                        ).then(function(response){
                            if(response.data){
                                addValueToComplexFieldDone(field, response.data);
                                deferred.resolve();
                            }
                            else{
                                deferred.reject(response);
                            }
                        }, function(err){
                            deferred.reject(err);
                            console.error('Error in adding value to complex field: ', err)
                        });
                    }
                    else{
                        deferred.resolve();
                    }
                });
            };
            function addValueToComplexFieldDone(field, config){
                field.valueList[$stateParams.profileId].push(config.valueObj);
                $scope.profile.configuration = config.configuration;
            }

            $scope.deleteValueFromComplexField = function(valueObj, field){
                ProfileManager.deleteValueFromComplexField({
                    valueObj: valueObj,
                    fieldId: field.id,
                    projectId: $stateParams.projectId,
                    profileId: $stateParams.profileId,
                    valueIdKeyObjectArr: $scope.valueIdKeyObjectArr || []
                }).then(function(response){
                    if(response.data){
                        deleteValueFromComplexFieldDone(field, response.data);
                    }
                    else{
                        console.error('Error in deleting complex value: ', response);
                    }
                }, function(err){
                    console.error('Error in deleting complex value: ', err);
                });
            };
            function deleteValueFromComplexFieldDone(field, config){
                var newArr = field.valueList[$stateParams.profileId].filter(function(valueObj){
                    return valueObj.id !== config.valueObj.id;
                });
                field.valueList[$stateParams.profileId] = newArr;
                $scope.profile.configuration = config.configuration;
            }

            function spliceObjectFromArray(array, index){
                var newArr = array.filter(function(valueIdKeyObj, valueIndex){
                    return valueIndex !== index;
                });
                return newArr;
            }

            $scope.navigateToChildField = function(field, valueObj){
                var valueAdded = false;
                if(!valueObj){
                    valueObj = {};
                }
                $scope.valueIdKeyObjectArr.forEach(function(valueIdKeyObject){
                    if(valueIdKeyObject.fieldId === field.id){
                        valueIdKeyObject._value_id = valueObj.id;
                        if(field.parameters[0].value === 'no'){
                            valueIdKeyObject.isRepeatable = false;
                        }
                        else{
                            valueIdKeyObject.isRepeatable = true;
                        }
                        valueAdded = true;
                    }
                });
                if(!valueAdded){
                    var obj = {
                        key: field.key,
                        _value_id: valueObj.id,
                        fieldId: field.id,
                        parentFieldId: $scope.parentfield.id
                    };
                    if(field.parameters[0].value === 'no'){
                        obj.isRepeatable = false;
                    }
                    else{
                        obj.isRepeatable = true;
                    }
                    $scope.valueIdKeyObjectArr.push(obj);
                }
                $scope.valueIdKeyObjectArr.forEach(function(valueIdKeyObj, valueIdIndex){
                    $scope.seclectedFields.forEach(function(selectedFieldObj, selectedFieldIndex){
                        if(selectedFieldObj.key === valueIdKeyObj.key){
                            if(selectedFieldObj.id !== field.id){
                                $scope.valueIdKeyObjectArr = spliceObjectFromArray($scope.valueIdKeyObjectArr, valueIdIndex)
                            }
                        }
                    });
                });

                $localForage.setItem(
                    'currentValueIdKeyObjectArr',
                    JSON.stringify($scope.valueIdKeyObjectArr)).then(function(){
                    $state.go('profile', {
                        projectId: $stateParams.projectId,
                        profileId: $stateParams.profileId,
                        sectionId: $scope.selectedSection.id,
                        fieldId: field.id,
                        parentValueId: valueObj.id
                    }, {reload: true});
                });
            };

            $scope.saveFieldValue = function(field){
                field.enabled = false;
                ProfileManager.saveFieldValue({
                    value: field.value,
                    projectId: $stateParams.projectId,
                    profileId: $stateParams.profileId,
                    fieldKey: field.key,
                    valueIdKeyObjectArr: $scope.valueIdKeyObjectArr
                }).then(function(response){
                    if(response.data){
                        $scope.profile.configuration = response.data.configuration;
                    }
                    else{
                        console.log('Error in saving field value: ', response);
                    }
                }, function(err){
                    console.error('Error in saving field value: ', err);
                });
            };
        }
    ]);