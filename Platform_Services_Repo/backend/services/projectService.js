/**
 * Created by Jithu.jose on 1/29/2016.
 */
var path = require('path');
var projectDB = require(path.resolve('backend/database/projectDB'));
var $q = require('q');

function saveProject(config) {
    var deferred =  $q.defer();
    projectDB.saveProject(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function updateProject(project) {
    var deferred =  $q.defer();
    projectDB.updateProject(project).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteProject(project) {
    var deferred =  $q.defer();
    projectDB.deleteProject(project).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function getAllProjects() {
    var deferred =  $q.defer();
    projectDB.getAllProjects().then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function getSingleProject(projectId) {
    var deferred =  $q.defer();
    projectDB.getSingleProject(projectId).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function addValueToComplexField(config) {
    var deferred =  $q.defer();
    projectDB.addValueToComplexField(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function deleteValueFromComplexField(config) {
    var deferred =  $q.defer();
    projectDB.deleteValueFromComplexField(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function changeProfileIdInGlobalConfig(config) {
    var deferred =  $q.defer();
    projectDB.changeProfileIdInGlobalConfig(config).then(function(profileId) {
        deferred.resolve(profileId);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

module.exports = {
    saveProject: saveProject,
    updateProject: updateProject,
    deleteProject: deleteProject,

    getAllProjects: getAllProjects,
    getSingleProject: getSingleProject,

    addValueToComplexField: addValueToComplexField,
    deleteValueFromComplexField: deleteValueFromComplexField,

    changeProfileIdInGlobalConfig: changeProfileIdInGlobalConfig
};