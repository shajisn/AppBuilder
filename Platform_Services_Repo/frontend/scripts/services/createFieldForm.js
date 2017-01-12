/**
 * Created by Jithu.jose on 2/8/2016.
 */

angular.module('mediaManager.services.createFieldForm', [])
    .service('CreateFieldForm', [
        '$modal',
        function($modal){
            function dismissDialogueBox(dialog){
                dialog.dismiss();
            }
            function generateKey(value){
                return value.toLocaleLowerCase().replace(/ /g, '_');
            }
            function show(config, callback){
                var modalName = 'create-field-form';
                $modal.open({
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: '/partials/modals/createFieldForm.html',
                    windowClass: modalName,
                    resolve: {
                        configs: function(){
                            return config;
                        }
                    },
                    controller: function($scope, $modalInstance, configs){
                        $scope.fieldObj = {};
                        $scope.sections = configs.sections;
                        $scope.heading = configs.heading;
                        $scope.types = [
                            {id: 'text', name: 'Text'},
                            {id: 'list', name: 'List'},
                            {id: 'boolean', name: 'Boolean'},
                            {id: 'complex', name: 'Complex'},
                            {id: 'template', name: 'Template'}
                        ];

                        if(configs.data){
                            $scope.fieldObj = configs.data;
                        }

                        configs.promise.then(function(){
                            dismissDialogueBox($modalInstance);
                        }, function(err){
                            $scope.error = err.toString();
                        });

                        $scope.fieldNameChanged = function(){
                            $scope.fieldObj.key = generateKey($scope.fieldObj.name);
                        };

                        $scope.save = function(){
                            if(!$scope.fieldObj.name || !$scope.fieldObj.sectionId || !$scope.fieldObj.type || !$scope.fieldObj.key){
                                return;
                            }
                            callback($scope.fieldObj);
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

