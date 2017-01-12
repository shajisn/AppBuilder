/**
 * Created by Krishnendu on 4/1/2016.
 */

angular.module('mediaApp.services.userService', [])
    .service('UserService', [
        '$q',
        'RestClient',
        function($q, RestClient){
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
            this.signup = function(data){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    '/api/auth/signup',
                    data
                ).then(function(details){
                    deferred.resolve(details);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
        }
    ]);