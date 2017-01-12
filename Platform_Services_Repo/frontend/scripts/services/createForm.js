/**
 * Created by Jithu.jose on 1/28/2016.
 */
angular.module('mediaManager.services.createForm', [])
    .service('CreateForm', [
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
                    templateUrl: '/partials/modals/createForm.html',
                    windowClass: modalName,
                    resolve: {
                        configs: function(){
                            return config;
                        }
                    },
                    controller: function($scope, $modalInstance, configs){
                        $scope.dataObj = {};
                        $scope.heading = configs.heading;
                        if(configs.data){
                            $scope.dataObj = configs.data;
                        }

                        configs.promise.then(function(){
                            dismissDialogueBox($modalInstance);
                        }, function(err){
                            $scope.error = err.toString();
                        });

                        $scope.save = function(){
                            if(!$scope.dataObj.name){
                                return;
                            }
                            callback($scope.dataObj);
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
    ])