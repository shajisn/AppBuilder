/**
 * Created by Jithu.jose on 2/25/2016.
 */

angular.module('mediaManager')
    .controller('TemplatesCtrl', [
        '$q',
        '$scope',
        'templates',
        'CreateTemplateForm',
        'TemplateManager',
        '$state',
        function($q, $scope, templates, CreateTemplateForm, TemplateManager, $state){
            $scope.templates = templates;
            $scope.OVPs = [
                {id: 'ooyala',name: 'OOYALA'},
                {id: 'brightCove',name: 'BrightCove'},
                {id: 'mpx',name: 'MPX'}
            ]
            $scope.addNewTemplate =  function(){
                var deferred = $q.defer();
                CreateTemplateForm.show({
                    promise: deferred.promise,
                    OVPs: $scope.OVPs,
                    heading: 'Add New Template'
                }, function(templateObj){
                    if(templateObj){
                        TemplateManager.saveTemplate(templateObj).then(function(response){
                            if(response.data){
                                saveTemplateDone(response.data);
                                deferred.resolve();
                            }
                            else{
                                console.log('Error in saving template: ', response);
                                deferred.reject(response);
                            }
                        }, function(err){
                            console.error('Error in saving template: ', err);
                            deferred.reject(err);
                        });
                    }
                });
            };

            function saveTemplateDone(template){
                $scope.templates.push(template);
            }

            $scope.updateTemplate =  function(template){
                var deferred = $q.defer();
                CreateTemplateForm.show({
                    promise: deferred.promise,
                    OVPs: $scope.OVPs,
                    heading: 'Add New Template',
                    data: JSON.parse(JSON.stringify(template))
                }, function(templateObj){
                    if(templateObj){
                        TemplateManager.updateTemplate(templateObj).then(function(response){
                            if(response.data){
                                updateTemplateDone(response.data);
                                deferred.resolve();
                            }
                            else{
                                console.log('Error in saving template: ', response);
                                deferred.reject(response);
                            }
                        }, function(err){
                            console.error('Error in saving template: ', err);
                            deferred.reject(err);
                        });
                    }
                });
            };
            function updateTemplateDone(templateObj){
                $scope.templates.forEach(function(template, index){
                     if(templateObj.id === template.id){
                         template.name = templateObj.name;
                         template.description = templateObj.description;
                         template.ovpUrlType = templateObj.ovpUrlType;
                         template.action= templateObj.action;
                         console.log(template);
                     }
                });
            }

            $scope.deleteTemplate =  function(template){
                TemplateManager.deleteTemplate({id: template.id}).then(function(response){
                    if(!response.data){
                        console.error(response);
                    }
                    deleteTemplateDone(response.data);
                }, function(err){
                    console.error('Error in deleting template: ', err);
                });
            };
            function deleteTemplateDone(templateId){
                var newTemplates = $scope.templates.filter(function(template){
                    return template.id !== templateId;
                });
                $scope.templates = newTemplates;
            }

            $scope.showTemplateConfiguration = function(template){
                $state.go('template', {templateId: template.id});
            };
        }
    ]);