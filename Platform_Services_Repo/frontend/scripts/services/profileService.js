/**
 * Created by Jithu.jose on 2/1/2016.
 */
angular.module('mediaManager.services.profileService', [])
    .service('ProfileService', [
        '$q',
        'RestClient',
        function($q, RestClient){

            function getAllProfilesForSingleProject(projectId){
                var deferred = $q.defer();

                RestClient.postRequestWithoutCache(
                    '/api/profile/getAllProfilesForSingleProject',
                    {projectId: projectId}
                ).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err)
                });
                return deferred.promise;
            }

            function getSingleProfile(profileId){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/profile/getSingleProfile', {profileId: profileId}).then(function(profile){
                    deferred.resolve(profile);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function saveProfile(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/profile/save', config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function updateProfile(profile){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/profile/update', profile).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function deleteProfile(profile){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache('api/profile/delete', profile).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function addValueToComplexField(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    'api/profile/addValueToComplexField',
                    config
                ).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function deleteValueFromComplexField(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    'api/profile/deleteValueFromComplexField',
                    config
                ).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function saveFieldValue(config){
                var deferred = $q.defer();
                RestClient.postRequestWithoutCache(
                    'api/profile/saveFieldValue',
                    config
                ).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            return{
                getAllProfilesForSingleProject: getAllProfilesForSingleProject,
                getSingleProfile: getSingleProfile,

                saveProfile: saveProfile,
                updateProfile: updateProfile,
                deleteProfile: deleteProfile,

                addValueToComplexField: addValueToComplexField,
                deleteValueFromComplexField: deleteValueFromComplexField,
                saveFieldValue: saveFieldValue,


            }
        }
    ]);