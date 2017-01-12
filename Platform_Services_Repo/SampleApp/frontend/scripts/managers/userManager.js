/**
 * Created by Krishnendu on 4/1/2016.
 */

angular.module('mediaApp.managers.userManager', [])
    .factory('UserManager', [
        '$q',
        'UserService',
        function($q, UserService){
            var factoryObj = {
                getSingleFormDataWithConfig: function(formId){
                    var deferred = $q.defer();
                    UserService.getSingleFormDataWithConfig({id: formId}).then(function (result) {
                        deferred.resolve(result);
                    }, function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },
                signup: function(credentials){
                    var deferred = $q.defer();
                    UserService.signup({credentials: credentials}).then(function(result){
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

