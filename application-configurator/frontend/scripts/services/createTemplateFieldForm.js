/**
 * Created by Jithu.jose on 2/26/2016.
 */

angular.module('mediaManager.services.createTemplateFieldForm', [])
    .service('CreateTemplateFieldForm', [
        '$modal',
        function($modal){
            function dismissDialogueBox(dialog){
                dialog.dismiss();
            }
            function show(config, callback){
                var modalName = 'create-form';
                $modal.open({
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: '/partials/modals/createTemplateFieldForm.html',
                    windowClass: modalName,
                    resolve: {
                        configs: function(){
                            return config;
                        }
                    },
                    controller: function($scope, $modalInstance, configs){
                        $scope.templateFieldObj = {};
                        $scope.types = [
                            {id: 'string', name: 'String'},
                            {id: 'array', name: 'Array'},
                            {id: 'object', name: 'Object'}
                        ];

                        $scope.heading = configs.heading;
                        if(configs.data){
                            $scope.templateFieldObj = configs.data;
                        }

                        configs.promise.then(function(){
                            dismissDialogueBox($modalInstance);
                        }, function(err){
                            $scope.error = err.toString();
                        });

                        $scope.save = function(){
                            if(!$scope.templateFieldObj.name || !$scope.templateFieldObj.type){
                                return;
                            }
                            if($scope.templateFieldObj.type !== 'object' && !$scope.templateFieldObj.value){
                                return;
                            }
                            callback($scope.templateFieldObj);
                        };

                        $scope.onTemplateTypeChange = function(type){
                            if(type === 'object'){
                                $scope.templateFieldObj.value = '';
                            }
                        };

                        $scope.dismiss = function(){
                            callback(false);
                            dismissDialogueBox($modalInstance);
                        };
                    }
                })
            }
            return {
                show: show
            }
        }
    ]);
