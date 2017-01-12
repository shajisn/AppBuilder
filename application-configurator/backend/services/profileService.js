/**
 * Created by Jithu.jose on 2/1/2016.
 */

var path = require('path');
var async = require('async');
var profileDB = require(path.resolve('backend/database/profileDB'));
var $q = require('q');

function saveProfile(config) {
    var deferred =  $q.defer();
    profileDB.saveProfile(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function updateProfile(config) {
    var deferred =  $q.defer();
    profileDB.updateProfile(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteProfile(config) {
    var deferred =  $q.defer();
    profileDB.deleteProfile(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function getAllProfilesForSingleProject(projectId) {
    var deferred =  $q.defer();
    profileDB.getAllProfilesForSingleProject(projectId).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function getSingleProfile(profileId) {
    var deferred =  $q.defer();
    profileDB.getSingleProfile(profileId).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function saveFieldValue(config) {
    var deferred =  $q.defer();
    var valueIdKeyObjectArr = config.valueIdKeyObjectArr;
    async.waterfall([
        function(callback){
            profileDB.getSingleProfile(config.profileId).then(function(profile){
                callback(null, profile);
            }).fail(function(err){
                callback(err)
            });
        },
        function(profile, callback){
            var currentElement = profile.configuration;
            valueIdKeyObjectArr.forEach(function(valueKeyObj){
                if(!valueKeyObj.isRepeatable){
                    currentElement = currentElement[valueKeyObj.key];
                }
                else{
                    currentElement = currentElement[valueKeyObj.key].filter(function(currentElementObj){
                        return currentElementObj._value_id === valueKeyObj._value_id;
                    });
                    currentElement = currentElement[0];
                }

            });
            currentElement[config.fieldKey] = config.value;
            profileDB.saveProfileConfiguration(profile).then(function(response){
                callback(null,  profile.configuration);
            }).fail(function(err){
                callback(err);
            });
        }
    ], function(err, result){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}

module.exports = {
    saveProfile: saveProfile,
    updateProfile: updateProfile,
    deleteProfile: deleteProfile,

    getAllProfilesForSingleProject: getAllProfilesForSingleProject,
    getSingleProfile: getSingleProfile,
    saveFieldValue: saveFieldValue
};