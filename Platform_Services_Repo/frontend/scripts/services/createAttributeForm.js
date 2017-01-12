/**
 * Created by Jithu.jose on 2/9/2016.
 */

/**
 * Created by Jithu.jose on 2/8/2016.
 */

angular.module('mediaManager.services.createAttributeForm', [])
    .service('CreateAttributeForm', [
        '$modal',
        function($modal){
            function dismissDialogueBox(dialog){
                dialog.dismiss();
            }

            function generateKey(value){
                return value.toLocaleLowerCase().replace(/ /g, '_');
            }
            function show(config, callback){
                var modalName = 'create-attribute-form';
                $modal.open({
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: '/partials/modals/createAttributeForm.html',
                    windowClass: modalName,
                    resolve: {
                        configs: function(){
                            return config;
                        }
                    },
                    controller: function($scope, $modalInstance, configs){
                        $scope.attributeObj = {};
                        $scope.heading = configs.heading;
                        $scope.types = [
                            {id: 'text', name: 'Text'},
                            {id: 'list', name: 'List'},
                            {id: 'boolean', name: 'Boolean'},
                            {id: 'complex', name: 'Complex'},
                            {id: 'template', name: 'Template'}
                        ];

                        if(configs.data){
                            $scope.attributeObj = configs.data;
                        }

                        configs.promise.then(function(){
                            dismissDialogueBox($modalInstance);
                        }, function(err){
                            $scope.error = err.toString();
                        });

                        $scope.attributeNameChanged = function(){
                            $scope.attributeObj.key = generateKey($scope.attributeObj.name);
                        };

                        $scope.save = function(){
                            if(!$scope.attributeObj.name || !$scope.attributeObj.type || !$scope.attributeObj.key){
                                return;
                            }
                            callback($scope.attributeObj);
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


