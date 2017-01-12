/**
 * Created by Jithu.jose on 2/1/2016.
 */
var path = require('path');
var profileModel = require(path.resolve('backend/database/profileModel'));
var $q = require('q');
var rs = require('random-strings');
var async = require('async');

function getAllProfilesForSingleProject(projectId){
    var deferred = $q.defer();
    profileModel.find({projectId: projectId}, '-configuration', function(err, profiles){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(profiles);
        }
    });
    return deferred.promise;
}
function getSingleProfile(profileId){
    var deferred = $q.defer();
    profileModel.find({id: profileId}, function(err, result){
        if(err || !result.length){
            deferred.reject(err);
        }
        else{
            deferred.resolve(result[0]);
        }
    });
    return deferred.promise;
}
//
function getGlobalAndLocalProfiles(config){
    var deferred = $q.defer();
    async.parallel([
        function(callback){
            getSingleProfile(config.globalProfileId).then(function(profile){
                callback(null, profile);
            }).fail(function(err){
                deferred.reject(err);
            });

        },
        function(callback){
            getSingleProfile(config.applicationProfileId).then(function(profile){
                callback(null, profile);
            }).fail(function(err){
                deferred.reject(err);
            });
        }
    ], function(err, result){
        if(err || !result.length){
            deferred.reject(err || 'Empty response');
        }
        else{
            var response = {
                globalConfig: result[0].configuration,
                applicationConfig: result[1].configuration
            };
            deferred.resolve(response);
        }
    });
    return deferred.promise;
}

function saveProfile(config){
    var deferred = $q.defer();
    var obj = {
        name: config.profile.name,
        id: rs.numeric(20),
        description: config.profile.description,
        projectId: config.projectId
    }
    var profileObj = new profileModel(obj);
    profileObj.save(function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(obj)
        }
    });
    return deferred.promise;
}

function updateProfile(config){
    var deferred = $q.defer();
    profileModel.update({_id: config.profile._id}, {$set: {
        name: config.profile.name,
        description: config.profile.description
    }}, function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(config);
        }
    });
    return deferred.promise;
}

function deleteProfile(config){
    var deferred = $q.defer();
    profileModel.find({_id: config._id}).remove(function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(config);
        }
    });
    return deferred.promise;
}

function getAllProfilesConfigurationForSingleProject(projectId){
    var deferred = $q.defer();
    profileModel.find({projectId: projectId}, 'id configuration', function(err, result){
        if(err || !result.length){
            deferred.reject(err);
        }
        else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}

function saveProfileConfiguration(profile){
    var deferred = $q.defer();
    profileModel.update({id: profile.id}, {
        $set: {'configuration': profile.configuration}
    }, function(err, result){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(result)
        }
    });
    return deferred.promise;
}

module.exports = {
    getAllProfilesForSingleProject: getAllProfilesForSingleProject,
    getSingleProfile: getSingleProfile,

    saveProfile: saveProfile,
    updateProfile: updateProfile,
    deleteProfile: deleteProfile,

    getAllProfilesConfigurationForSingleProject: getAllProfilesConfigurationForSingleProject,
    saveProfileConfiguration: saveProfileConfiguration,

    getGlobalAndLocalProfiles: getGlobalAndLocalProfiles
}