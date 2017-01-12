/**
 * Created by Krishnendu on 4/1/2016.
 */

angular.module('mediaApp')
    .controller('formCtrl', [
        '$q',
        '$scope',
        '$rootScope',
        'FormManager',
        '$stateParams',
        'constants',
        '$element',
        '$state',
        function($q, $scope, $rootScope, FormManager, $stateParams, constants, $element, $state){
            $scope.randomValue = '?' + Math.random();
            if(!$rootScope.form){
                $scope.pageConfiguration = constants.projectConfiguration.pages.filter(function(page){
                    return page.id === $stateParams.pageId;
                })[0];
                if(!$scope.pageConfiguration){
                    if($stateParams.pageId === 'crudFormPage'){
                        $state.go('home');
                        return;
                    }
                    console.error('Empty Page Configuration');
                    return;
                }
            }

            $scope.credentials = {};
            $scope.elementBlur = false;
            $scope.mode = $stateParams.mode;
            var hasFileUpload = false;
            var method = 'post';
            if($rootScope.form){
                $scope.credentials[$rootScope.form.id] = {};
            }
            if($stateParams.mode === 'update' && $rootScope.form){
                method = 'put';
                $rootScope.form.fields.forEach(function(field){
                    if(field.type === 'date'){
                        $rootScope.form.crudDataObj[field.id] = new Date($rootScope.form.crudDataObj[field.id]);
                    }
                });
                $scope.credentials[$rootScope.form.id] = $rootScope.form.crudDataObj;
            }


            $scope.onImageClick = function(imageId){
                $element.find('#'+imageId)[0].click();
            };

            $scope.onFileChange= function(filePointer){
                var fileId = filePointer.id;
                var files = filePointer.files;
                var formId = $(filePointer).closest('form')[0].id;
                var path = (window.URL || window.webkitURL).createObjectURL(files[0]);
                $scope.$apply(function(){
                    $scope.randomValue = '';
                    $scope.credentials[formId][fileId] = path;
                });
            };

            $scope.submitForm = function (credentials,form) {
                var fields = form.fields;
                hasFileUpload = false;
                if(!checkFieldValidity(credentials,fields,form.id)){
                    var credentialsJson = formatFormData(credentials,fields, form.field_wrapper_key);
                    if(hasFileUpload){
                        var formData = new FormData();
                        formData.append('data', JSON.stringify(credentialsJson));
                        formData.append('templateId', form.template_id);
                        formData.append('command', 'setDataFromForm');
                        formData.append('fileKey', 'image');
                        formData.append('method', method);
                        formData.append('fieldWrapperKey', form.field_wrapper_key);
                        if($element.find('#image')[0].files[0]){
                            formData.append('image',  $element.find('#image')[0].files[0]);
                        }
                        FormManager.setFormData(formData).then(function(response){
                            setFormDataDone();
                        }, function(err){
                            console.log('Error in saving form data: ', err);
                        });
                    }
                    else{
                        FormManager.setData(credentialsJson,form.template_id, form.field_wrapper_key).then(function (result) {
                            console.log(result);
                        },function(err){
                            console.log(err);
                        });
                    }

                }
            };
            function setFormDataDone(){
                $state.go($rootScope.previousState.name,{
                    pageId: $rootScope.fromParams.pageId
                });
            }

            $scope.clearTexts = function(btnAction){
                $scope.errorMsg = '';
                if(btnAction == "reset"){
                    $scope.credentials = {};
                }
            };

            function checkFieldValidity(credentials,fields,formId){
                if(typeof $scope.credentials[formId] == "undefined"){
                    $scope.credentials[formId] = {};
                }
                fields.forEach(function(field){
                    if(field.type === 'file'){
                        hasFileUpload = true;
                    }
                });
                $scope.credentials[formId]["showError"] = false;
                var errormsg = '';
                if(typeof credentials != "undefined"){
                    for(var field in fields){
                        if(fields[field].type == "email"){
                            if(/\S+@\S+\.\S+/.test(credentials[fields[field].id]) != true){
                                errormsg = "Enter a valid e-mail id.";
                            }
                        }else if(fields[field].type == "date"){
                            if(credentials[fields[field].id] == null || typeof credentials[fields[field].id] == undefined){
                                errormsg = "Select a valid DOB.";
                            }
                        }else if(fields[field].type == "tel"){
                            if(/^[0-9]*$/.test(credentials[fields[field].id]) != true){
                                errormsg = "Enter valid mobile number.";
                            }
                        }
                    }
                }else{
                    errormsg = "Please fill the form completely.";
                }

                $scope.errorMsg = errormsg;
                $scope.credentials[formId]["showError"] = ($scope.errorMsg != '') ? true : false;
                return $scope.credentials[formId]["showError"];
            }

            function formatFormData(credentials,fields, fieldWrapperKey){
                var formData = {},tempObj = {};
                for(var field in fields){
                    if(fields[field].type == "date"){
                        tempObj[fields[field].id] = (credentials[fields[field].id])?credentials[fields[field].id].getTime():'';
                    }else{
                        tempObj[fields[field].id] = (credentials[fields[field].id])?credentials[fields[field].id]:'';
                    }
                }
                formData[fieldWrapperKey] = tempObj;
                return formData;
            }

            function populateForm() {
                var formPromiseArr = [];
                $scope.pageConfiguration.forms.forEach(function(form){
                    formPromiseArr.push(FormManager.getSingleFormDataWithConfig(form.form_id));
                });
                $q.all(formPromiseArr).then(function(responseArr){
                    populateAllFormsDone(responseArr);
                }, function(err){
                    console.error('Error in getting form details: ', err);
                });
            }

            function populateAllFormsDone(formResponseArr){
                $scope.forms = formResponseArr;
                populateDynamicDropdownOptions();
            }

            function populateDynamicDropdownOptions(){
                $scope.forms.forEach(function(form){
                    form.fields.forEach(function(field){
                        if(field.type === 'dynamicDropdown' && field.url){
                            FormManager.getDynamicDropdownOptions(field.url, form.id, field.id).then(function(response){
                                populateDynamicDropdownOptionsDone(response);
                            }, function(err){
                                console.log('Error in getting dynamic dropdown data: ', err);
                            });
                        }
                    });
                });
            }
            function populateDynamicDropdownOptionsDone(response){
                var options = [];
                var form = $scope.forms.filter(function(form){
                    return form.id === response.formId;
                })[0];
                var field = form.fields.filter(function(field){
                    return field.id === response.fieldId;
                })[0];
                for(var key in response.data){
                    var tempOption = response.data[key];
                    options.push({
                        name: tempOption[field.dynamic_option_keys.name_key],
                        value: tempOption[field.dynamic_option_keys.value_key]
                    })
                }
                field.options = options;
            }

            function attachForm(){
                $scope.forms = [$rootScope.form];
                populateDynamicDropdownOptions
            }

            $scope.$on('$destroy', function(){
                $rootScope.form = '';
            });
            if(!$rootScope.form){
                populateForm();
                return;
            }
            attachForm();
        }
    ]);