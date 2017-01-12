/**
 * Created by Jithu.jose on 1/29/2016.
 */
var path = require('path');
var projectService = require(path.resolve('backend/services/projectService'));
var $q = require('q');

function saveProject(config) {
    var deferred =  $q.defer();
    projectService.saveProject(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function updateProject(project) {
    var deferred =  $q.defer();
    projectService.updateProject(project).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteProject(project) {
    var deferred =  $q.defer();
    projectService.deleteProject(project).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function getAllProjects() {
    var deferred =  $q.defer();
    projectService.getAllProjects().then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function getSingleProject(projectId) {
    var deferred =  $q.defer();
    projectService.getSingleProject(projectId).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function changeProfileIdInGlobalConfig(config) {
    var deferred =  $q.defer();
    projectService.changeProfileIdInGlobalConfig(config).then(function (response) {
        deferred.resolve(response);
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

    changeProfileIdInGlobalConfig: changeProfileIdInGlobalConfig
};