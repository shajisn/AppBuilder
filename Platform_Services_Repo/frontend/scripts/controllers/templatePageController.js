/**
 * Created by Jithu.jose on 2/26/2016.
 */

angular.module('mediaManager')
    .controller('TemplatePageCtrl', [
        '$q',
        '$scope',
        '$state',
        'template',
        'CreateTemplateFieldForm',
        'TemplateManager',
        '$stateParams',
        function($q, $scope, $state, template, CreateTemplateFieldForm, TemplateManager, $stateParams){
            $scope.template = template;

            $scope.addNewField = function(){
                var deferred = $q.defer();
                CreateTemplateFieldForm.show({
                    promise: deferred.promise,
                    heading: 'Add New Template Field'
                }, function(fieldObj){
                    if(fieldObj){
                        var config = {
                            fieldObj: fieldObj,
                            templateId: $stateParams.templateId
                        };
                        if($stateParams.fieldId){
                            config.parentId = $stateParams.fieldId;
                        }
                        TemplateManager.saveField(config).then(function(response){
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
                if(!$scope.template.fields){
                    $scope.template.fields = [];
                }
                $scope.template.fields.push(fieldObj);
            }

            $scope.updateField = function(field){
                var deferred = $q.defer();
                CreateTemplateFieldForm.show({
                    promise: deferred.promise,
                    heading: 'Update New Template Field',
                    data: JSON.parse(JSON.stringify(field))
                }, function(fieldObj){
                    if(fieldObj){
                        var config = {
                            fieldObj: fieldObj,
                            templateId: $stateParams.templateId
                        };
                        if($stateParams.fieldId){
                            config.parentId = $stateParams.fieldId;
                        }
                        TemplateManager.updateField(config).then(function(response){
                            if(response.data){
                                updateFieldDone(response.data);
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
            function updateFieldDone(fieldObj){
                for(var key in $scope.template.fields){
                    var field = $scope.template.fields[key];
                    if(field.id === fieldObj.id){
                        field.name = fieldObj.name;
                        field.value = fieldObj.value;
                        field.description = fieldObj.description;
                    }
                }
            }
            $scope.deleteField = function(field){
                var config = {
                    fieldId: field.id,
                    templateId: $stateParams.templateId
                };
                if($stateParams.fieldId){
                    config.parentFieldId = $stateParams.fieldId;
                }
                TemplateManager.deleteField(config).then(function(response){
                    if(response.data){
                        deleteFieldDone(response.data);
                    }

                }, function(err){
                    console.error('Error in deleting field: ', err);
                })
            };
            function deleteFieldDone(fieldId){
                $scope.template.fields.forEach(function(field, index){
                    if(field.id === fieldId){
                        $scope.template.fields.splice(index, 1);
                    }
                });
            }

            $scope.generateTemplateConfiguration = function(){
                TemplateManager.generateTemplateConfiguration($stateParams.templateId).then(function(){
                    console.log('Configuration generated successfully: ');
                }, function(err){
                    console.error('Error in generating configuration: ', err);
                })
            };

            $scope.navigateToField = function(field){
                if(field.type !== 'string'){
                    $state.go('template', {
                        templateId: $stateParams.templateId,
                        fieldId: field.id
                    }, {reload: true});
                }
            };
        }
    ]);
