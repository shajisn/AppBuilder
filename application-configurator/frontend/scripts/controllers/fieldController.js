/**
 * Created by Jithu.jose on 2/9/2016.
 */

'use strict';
angular.module('mediaManager')
    .controller('FieldCtrl', [
        '$q',
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        '$localForage',
        'ConfigurationManager',
        'CreateAttributeForm',
        'CreateSelectOptionForm',
        function($q, $scope, $rootScope, $state, $stateParams, $localForage, ConfigurationManager, CreateAttributeForm, CreateSelectOptionForm){
            function getCurrentSelectedField(){
                var deferred = $q.defer();
                $localForage.getItem('currentSelectedField').then(function(field){
                    if(field && $rootScope.previousState.name === 'project'){
                        field = JSON.parse(field);
                        if(field.id === $stateParams.fieldId){
                            deferred.resolve(field);
                        }
                        else{
                            deferred.reject();
                        }
                    }
                    else{
                        if($stateParams.projectId && $stateParams.fieldId){
                            ConfigurationManager.getSingleFieldForProject(
                                $stateParams.projectId,
                                $stateParams.fieldId
                            ).then(function(field){
                                deferred.resolve(field);
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

            getCurrentSelectedField().then(function(field){
                initValues(field);
            }, function(err){
                console.error('Error in getting single field: ', err);
            });


            function initValues(field){
                $scope.field = JSON.parse(JSON.stringify(field));
                $scope.tabs = [
                    {
                        id: 'general',
                        name: 'General',
                        onClick: changeTab
                    },
                    {
                        id: 'parameters',
                        name: 'Parameters',
                        onClick: changeTab
                    }
                ];
                if(field.attributes){
                    $scope.tabs.push({
                        id: 'attributes',
                        name: 'Attributes',
                        onClick: changeTab
                    })
                }
                $scope.generalProperties = [];
                $scope.parameters = $scope.field.parameters;
                $scope.attributes = $scope.field.attributes;
                delete field.parameters;
                delete field.attributes;
                for(var key in field){
                    $scope.generalProperties.push({
                        name: key,
                        value: field[key]
                    });
                }
            }

            $scope.addNewAttribute = function(){
                var deferred = $q.defer();
                CreateAttributeForm.show({
                    promise: deferred.promise,
                    heading: 'Add New Attribute'
                }, function(attrObj){
                    if(attrObj){
                        attrObj.parentId = $scope.field.id
                        ConfigurationManager.saveAttribute(attrObj, $stateParams.projectId).then(function(response){
                            if(response.data){
                                saveAttributeDone(response.data);
                                deferred.resolve();
                            }
                            else{
                                console.log('Error in saving attribute: ', response);
                                deferred.reject(response);
                            }
                        }, function(err){
                            console.error('Error in saving attribute: ', err);
                            deferred.reject(err);
                        });
                    }
                });
            };
            function saveAttributeDone(fieldObj){
                var attrObj = {
                    name: fieldObj.name,
                    key: fieldObj.key,
                    type: fieldObj.type,
                    id: fieldObj.id
                };
                $scope.attributes.push(attrObj);
            }

            $scope.updateAttribute = function(attribute){
                var deferred = $q.defer();
                CreateAttributeForm.show({
                    promise: deferred.promise,
                    heading: 'Update Attribute',
                    data: attribute
                }, function(attrObj){
                    if(attrObj){
                        attrObj.parentId = $scope.field.id
                        ConfigurationManager.updateAttribute(attrObj, $stateParams.projectId).then(function(response){
                            if(response.data){
                                updateAttributeDone(response.data);
                                deferred.resolve();
                            }
                            else{
                                console.log('Error in saving attribute: ', response);
                                deferred.reject(response);
                            }
                        }, function(err){
                            console.error('Error in saving attribute: ', err);
                            deferred.reject(err);
                        });
                    }
                });
            };
            function updateAttributeDone(attributeObj){
                $scope.attributes.forEach(function(attribute, index){
                    if(attribute.id === attributeObj.id){
                        $scope.attributes[index].name = attributeObj.name
                    }
                });
            }

            $scope.deleteAttribute = function(attribute){
                ConfigurationManager.deleteAttribute({
                    id: attribute.id,
                    parentId: $scope.field.id
                }, $stateParams.projectId).then(function(response){
                    deleteAttributeDone(response.data);
                }, function(err){
                    console.log('Error in deleting attribute: ', err);
                });
                console.log('deleted');
            };

            function deleteAttributeDone(attributeObj){
                var newArr = $scope.attributes.filter(function(attribute){
                    return attribute.id !== attributeObj.id
                });
                $scope.attributes = newArr;
            }

            $scope.updateParameter = function(){
                $scope.parameters.forEach(function(parameter){
                    if(parameter.$$hashKey){
                        delete parameter.$$hashKey
                    }
                });
                ConfigurationManager.updateParameter({
                    projectId: $stateParams.projectId,
                    fieldId: $scope.field.id,
                    parameters: $scope.parameters
                }).then(function(response){

                }, function(err){
                    console.error('Error in updating parameters: ', err);
                });
            };

            $scope.generateProfileConfiguration = function(){
                ConfigurationManager.generateProfileConfiguration($stateParams.projectId).then(function(resposne){
                    console.log('generateProfileConfiguration SuccessFull', resposne);
                }, function(err){
                    console.log('Error in generating profile configuration: ', err);
                });
            };

            $scope.navigateToField = function(attribute){
                //$localForage.setItem('currentSelectedField', JSON.stringify(attribute)).then(function(err){
                //
                //});
                $state.go('field', {
                    projectId: $stateParams.projectId,
                    fieldId: attribute.id
                }, {reload: true});
            };

            $scope.addNewDynamicOptionToListField = function(){
                var deferred = $q.defer();
                CreateSelectOptionForm.show({
                    promise: deferred.promise,
                    heading: 'Add New Option'
                }, function(selectOptionObj){
                    if(selectOptionObj){
                        ConfigurationManager.saveDynamicOptionToListField({
                            selectOptionObj: selectOptionObj,
                            projectId: $stateParams.projectId,
                            fieldId: $stateParams.fieldId
                        }).then(function(response){
                            if(response.data){
                                saveDynamicOptionToListFieldDone(response.data);
                                deferred.resolve();
                            }
                            else{
                                console.log('Error in saving dynamic options: ', response);
                                deferred.reject(response);
                            }
                        }, function(err){
                            console.error('Error in saving dynamic options: ', err);
                            deferred.reject(err);
                        });
                    }
                });
            };

            function saveDynamicOptionToListFieldDone(selectOptionObj){
                $scope.field.parameters[1].data.push(selectOptionObj);
            }

            $scope.deleteDynamicOptionFromListField = function(option){
                ConfigurationManager.deleteDynamicOptionFromListField({
                    optionId: option.id,
                    projectId: $stateParams.projectId,
                    fieldId: $stateParams.fieldId
                }).then(function(response){
                    if(response.data){
                        deleteDynamicOptionFromListFieldDone(response.data);
                    }
                    else{
                        console.log('Error in deleting dynamic option: ', response);
                    }
                }, function(err){
                    console.error('Error in deleting dynamic option: ', err);
                });
            };
            function deleteDynamicOptionFromListFieldDone(optionId){
                var newData = $scope.field.parameters[1].data.filter(function(option){
                    return optionId !== option.id;
                });
                $scope.field.parameters[1].data = newData;
            }

            function changeTab(tab){
                $scope.selectedTab = tab;
            }

        }
    ]);