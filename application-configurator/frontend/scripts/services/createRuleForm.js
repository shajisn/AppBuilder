/**
 * Created by Jithu.jose on 2/3/2016.
 */

angular.module('mediaManager.services.createRuleForm', [])
    .service('CreateRuleForm', [
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
                    templateUrl: '/partials/modals/createRuleForm.html',
                    windowClass: modalName,
                    resolve: {
                        configs: function(){
                            return config;
                        }
                    },
                    controller: function($scope, $modalInstance, configs){
                        $scope.ruleObj = {};
                        $scope.applications = configs.applications;
                        $scope.profiles = configs.profiles;
                        $scope.heading = configs.heading;
                        if(configs.data){
                            $scope.ruleObj = configs.data;
                        }

                        configs.promise.then(function(){
                            dismissDialogueBox($modalInstance);
                        }, function(err){
                            $scope.error = err.toString();
                        });

                        $scope.save = function(){
                            if(!$scope.ruleObj.name || !$scope.ruleObj.applicationId){
                                return;
                            }
                            callback($scope.ruleObj);
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
