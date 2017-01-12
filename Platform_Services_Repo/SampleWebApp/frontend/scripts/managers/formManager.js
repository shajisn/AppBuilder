/**
 * Created by Krishnendu on 4/1/2016.
 */

angular.module('mediaApp.managers.formManager', [])
    .factory('FormManager', [
        '$q',
        'FormService',
        'constants',
        function($q, FormService, constants){
            var factoryObj = {
                getSingleFormDataWithConfig: function(formId){
                    var deferred = $q.defer();
                    FormService.getSingleFormDataWithConfig({id: formId}).then(function (result) {
                        deferred.resolve(result);
                    }, function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },
                setData: function(data, templateId, fieldWrapperKey){
                    var deferred = $q.defer();
                    FormService.setData({
                        data: data,
                        templateId: templateId,
                        fieldWrapperKey: fieldWrapperKey,
                        method: 'post',
                        command: 'setData'
                    }).then(function(result){
                        deferred.resolve(result)
                    }, function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },

                getDynamicDropdownOptions: function(url, formId, fieldId){
                    var deferred = $q.defer();
                    FormService.getDynamicDropdownOptions({
                        url: url,
                        formId: formId,
                        fieldId: fieldId
                    }).then(function(result){
                        deferred.resolve(result)
                    }, function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },

                setFormData: function(formData){
                    var deferred = $q.defer();
                    var url = constants.middlewareURL + '/api/public/execute';
                    FormService.setFormData(url, formData).then(function(result){
                        deferred.resolve(result)
                    }, function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                }
            };
            return factoryObj;
        }
    ]);

