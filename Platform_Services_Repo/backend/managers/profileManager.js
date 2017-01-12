/**
 * Created by Jithu.jose on 2/1/2016.
 */

var path = require('path');
var $q = require('q');
var profileService = require(path.resolve('backend/services/profileService'));
var projectService = require(path.resolve('backend/services/projectService'));
var configurationService = require(path.resolve('backend/services/configurationService'));

function saveProfile(config) {
    var deferred =  $q.defer();
    profileService.saveProfile(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function updateProfile(config) {
    var deferred =  $q.defer();
    profileService.updateProfile(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteProfile(config) {
    var deferred =  $q.defer();
    profileService.deleteProfile(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function getAllProfilesForSingleProject(projectId) {
    var deferred =  $q.defer();
    profileService.getAllProfilesForSingleProject(projectId).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function getSingleProfile(profile) {
    var deferred =  $q.defer();
    profileService.getSingleProfile(profile.profileId).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function addValueToComplexField(config) {
    var deferred =  $q.defer();
    projectService.addValueToComplexField(config).then(function (valueObj) {
        config.valueObj = valueObj;
        configurationService.updateComplexFieldInConfiguration(config).then(function(configuration){
            deferred.resolve({configuration: configuration, valueObj: valueObj});
        }).fail(function(err){
            deferred.reject(err);
        });
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function deleteValueFromComplexField(config) {
    var deferred =  $q.defer();
    projectService.deleteValueFromComplexField(config).then(function (valueObj) {
        //config.valueObj = valueObj;
        configurationService.deleteComplexFieldFromConfiguration(config).then(function(configuration){
            deferred.resolve({configuration: configuration, valueObj: config.valueObj});
        }).fail(function(err){
            deferred.reject(err);
        });
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function saveFieldValue(config) {
    var deferred =  $q.defer();
    profileService.saveFieldValue(config).then(function (configuration) {
        deferred.resolve({configuration: configuration});
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

module.exports = {
    saveProfile: saveProfile,
    updateProfile: updateProfile,
    deleteProfile: deleteProfile,

    getAllProfilesForSingleProject: getAllProfilesForSingleProject,
    getSingleProfile: getSingleProfile,

    addValueToComplexField: addValueToComplexField,
    deleteValueFromComplexField: deleteValueFromComplexField,
    saveFieldValue: saveFieldValue
};