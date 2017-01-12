/**
 * Created by Jithu.jose on 6/6/2016.
 */
angular.module('mediaApp')
    .controller('crudCtrl', [
        '$q',
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'CRUDManager',
        'constants',
        function($q, $scope, $rootScope, $state, $stateParams, CRUDManager, constants){
            $scope.loading = true;
            $scope.selectedRowArr = [];
            $scope.checkboxFieldValues = {};
            $scope.randomValue = 0;
            $scope.pageConfiguration = constants.projectConfiguration.pages.filter(function(page){
                return page.id === $stateParams.pageId;
            })[0];
            if(!$scope.pageConfiguration){
                console.error('Empty Page Configuration');
                return;
            }

            function populateCRUD(){
                var crudPromiseArr = [];
                $scope.pageConfiguration.cruds.forEach(function(crud){
                    crudPromiseArr.push(CRUDManager.getSingleCRUDData(crud.crud_id));
                });
                $q.all(crudPromiseArr).then(function(responseArr){
                    populateAllCRUDDone(responseArr);
                }, function(err){
                    $scope.loading = false;
                    console.error('Error in getting form details: ', err);
                });
            }
            function populateAllCRUDDone(responseArr){
                $scope.loading = false;
                $scope.cruds = responseArr;
                $scope.cruds.forEach(function(crud){
                    crud.formData.fieldsObj = {};
                    crud.formData.fields.forEach(function(field){
                        if(field.type === 'identifier'){
                            crud.formData.identifier = field;
                        }
                        crud.formData.fieldsObj[field.id] = field;
                    });
                    CRUDManager.getSingleCRUDContent(crud).then(function(response){
                        $scope.randomValue = Math.random();
                        if(crud.formData.field_wrapper_key){
                            response = response[crud.formData.field_wrapper_key];
                        }
                        crud.crudData = response;
                    }, function(err){
                        console.log('Error in getting data of ' + crud.id + ' crud: ', err);
                    });
                });
            }

            $scope.updateSelectedRows = function(checked, rowId){
                if(checked){
                    $scope.selectedRowArr.push(rowId);
                }
                else{
                    $scope.selectedRowArr.splice($scope.selectedRowArr.indexOf(rowId), 1);
                }
            };

            $scope.onThumbnailClick = function(dataObj){
                dataObj.isSelected = !dataObj.isSelected;
                $scope.updateSelectedRows(dataObj.isSelected, dataObj.id);
            };

            $scope.onButtonAction = function(button, crud){
                if(button.type === 'create'){
                    createNewRow(crud);
                }
                else if(button.type === 'update'){
                    updateCurrentRow(crud);
                }
                else if(button.type === 'delete'){
                    deleteSelectedRows(crud);
                }
            };

            function createNewRow(crud){
                $rootScope.form = {
                    id: crud.formData.id,
                    fields: crud.formData.fields,
                    buttons: crud.formData.buttons,
                    template_id: crud.template_id,
                    field_wrapper_key: crud.formData.field_wrapper_key
                };
                $state.go('form', {
                    pageId: 'crudFormPage'
                });
            }
            function deleteSelectedRows(crud){
                var deleteReqArr = [];
                angular.forEach($scope.selectedRowArr, function(rowId, index){
                    deleteReqArr.push(CRUDManager.deleteData({id: rowId}, crud.template_id));
                });
                $q.all(deleteReqArr).then(function(response){
                    deleteSelectedRowsDone(crud);
                }, function(err){
                    console.log('Error in deleting rows: ', err);
                })
            }
            function deleteSelectedRowsDone(crud){
                $scope.selectedRowArr = [];
                CRUDManager.getSingleCRUDContent(crud).then(function(response){
                    if(crud.formData.field_wrapper_key){
                        response = response[crud.formData.field_wrapper_key];
                    }
                    $scope.randomValue = Math.random();
                    crud.crudData = response;
                }, function(err){
                    console.log('Error in getting data of ' + crud.id + ' crud: ', err);
                });
            }
            function updateCurrentRow(crud){
                var crudDataObj = crud.crudData.filter(function(dataObj){
                    return dataObj[crud.formData.identifier.id] === $scope.selectedRowArr[0];
                })[0];
                if(crudDataObj){
                    $rootScope.form = {
                        id: crud.formData.id,
                        fields: crud.formData.fields,
                        buttons: crud.formData.buttons,
                        template_id: crud.template_id,
                        field_wrapper_key: crud.formData.field_wrapper_key,
                        crudDataObj: crudDataObj
                    };
                    $state.go('form', {
                        pageId: 'crudFormPage',
                        mode: 'update'
                    });
                    return;
                }
                console.log('Failed to get update row');
            }

            populateCRUD();
        }
    ]);