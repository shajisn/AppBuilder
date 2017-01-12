/**
 * Created by Jithu.jose on 2/1/2016.
 */
angular.module('mediaManager.managers.profileManager', [])
    .service('ProfileManager', [
        '$q',
        'ProfileService',
        function($q, ProfileService){

            function getAllProfilesForSingleProject(projectId){
                var deferred = $q.defer();
                ProfileService.getAllProfilesForSingleProject(projectId).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err)
                });
                return deferred.promise;
            }
            function saveProfile(config, projectId){
                var deferred = $q.defer();
                ProfileService.saveProfile({
                    profile: config,
                    projectId: projectId
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function updateProfile(profile, projectId){
                var deferred = $q.defer();
                ProfileService.updateProfile({
                    profile: profile,
                    projectId: projectId
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
            function deleteProfile(profile){
                var deferred = $q.defer();
                ProfileService.deleteProfile(profile).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function getSingleProfile(profileId) {
                var deferred =  $q.defer();
                ProfileService.getSingleProfile(profileId).then(function (response) {
                    deferred.resolve(response);
                }, function (err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function getAllProfilesForSingleProject(projectId){
                var deferred = $q.defer();
                ProfileService.getAllProfilesForSingleProject(projectId).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err)
                });
                return deferred.promise;
            }


            function addValueToComplexField(name, projectId, profileId, parentValueId, fieldId, valueIdKeyObjectArr){
                var deferred = $q.defer();
                ProfileService.addValueToComplexField({
                    name: name,
                    projectId: projectId,
                    profileId: profileId,
                    parentValueId: parentValueId,
                    fieldId: fieldId,
                    valueIdKeyObjectArr: valueIdKeyObjectArr
                }).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err)
                });
                return deferred.promise;
            }

            function deleteValueFromComplexField(config){
                var deferred = $q.defer();
                ProfileService.deleteValueFromComplexField(config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err)
                });
                return deferred.promise;
            }

            function saveFieldValue(config){
                var deferred = $q.defer();
                ProfileService.saveFieldValue(config).then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err)
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
                saveFieldValue: saveFieldValue
            }
        }
    ]);