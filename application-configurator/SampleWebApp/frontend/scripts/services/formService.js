/**
 * Created by Krishnendu on 4/1/2016.
 */

angular.module('mediaApp.services.formService', [])
    .service('FormService', [
        '$q',
        'RestClient',
        'constants',
        function($q, RestClient, constants){
            this.getSingleFormDataWithConfig = function (data) {
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    '/api/auth/getSingleFormDataWithConfig', data)
                .then(function(formData){
                    deferred.resolve(formData);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            this.setData = function(data){
                var deferred = $q.defer();
                var url = constants.middlewareURL + '/api/public/execute';
                RestClient.postRequestWithoutCache(url, data).then(function(response){
                    if(response.error){
                        deferred.reject(response.error);
                        return;
                    }
                    deferred.resolve(response.data);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            };

            this.getDynamicDropdownOptions = function(data){
                var deferred = $q.defer();
                RestClient.getRequestWithoutCache(data.url).then(function(response){
                    if(response.error){
                        deferred.reject(response.error);
                        return;
                    }
                    deferred.resolve({
                        formId: data.formId,
                        fieldId: data.fieldId,
                        data: response
                    });
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            };

            this.setFormData = function(url, formData){
                var deferred = $q.defer();
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                       deferred.resolve(xhr.responseText);
                    }
                    else if(xhr.readyState === 4 && xhr.status !== 200){
                        deferred.reject(xhr.responseText);
                    }
                };
                xhr.open('POST', url, true);
                xhr.send(formData);
                return deferred.promise;
            }
        }
    ]);