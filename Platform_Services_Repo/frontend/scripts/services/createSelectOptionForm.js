/**
 * Created by Jithu.jose on 2/23/2016.
 */
/**
 * Created by Jithu.jose on 2/9/2016.
 */

angular.module('mediaManager.services.createSelectOptionForm', [])
    .service('CreateSelectOptionForm', [
        '$modal',
        function($modal){
            function dismissDialogueBox(dialog){
                dialog.dismiss();
            }

            function camelize(str) {
                return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
                }).replace(/\s+/g, '');
            }
            function show(config, callback){
                var modalName = 'create-selectOption-form';
                $modal.open({
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: '/partials/modals/createSelectOptionForm.html',
                    windowClass: modalName,
                    resolve: {
                        configs: function(){
                            return config;
                        }
                    },
                    controller: function($scope, $modalInstance, configs){
                        $scope.selectOptionObj = {};
                        $scope.heading = configs.heading;

                        if(configs.data){
                            $scope.selectOptionObj = configs.data;
                        }

                        configs.promise.then(function(){
                            dismissDialogueBox($modalInstance);
                        }, function(err){
                            $scope.error = err.toString();
                        });

                        $scope.selectOptionNameChanged = function(){
                            $scope.selectOptionObj.value = camelize($scope.selectOptionObj.name);
                        };

                        $scope.save = function(){
                            if(!$scope.selectOptionObj.name || !$scope.selectOptionObj.value){
                                return;
                            }
                            callback($scope.selectOptionObj);
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


