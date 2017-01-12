/**
 * Created by Jithu.jose on 2/25/2016.
 */

angular.module('mediaManager.services.createTemplateForm', [])
    .service('CreateTemplateForm', [
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
                    templateUrl: '/partials/modals/createTemplateForm.html',
                    windowClass: modalName,
                    resolve: {
                        configs: function(){
                            return config;
                        }
                    },
                    controller: function($scope, $modalInstance, configs){
                        $scope.templateObj = {};
                        $scope.templateObj.action = {};
                        $scope.OVPs = configs.OVPs;

                        $scope.heading = configs.heading;
                        if(configs.data){
                            $scope.templateObj = configs.data;
                        }

                        configs.promise.then(function(){
                            dismissDialogueBox($modalInstance);
                        }, function(err){
                            $scope.error = err.toString();
                        });

                        $scope.save = function(){
                            if(!$scope.templateObj.name){
                                return;
                            }
                            callback($scope.templateObj);
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
