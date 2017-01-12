/**
 * Created by Jithu.jose on 2/8/2016.
 */
var path = require('path');
var configurationService = require(path.resolve('backend/services/configurationService'));
var $q = require('q');

function getProjectConfiguration(config) {
    var deferred =  $q.defer();
    configurationService.getProjectConfiguration(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function saveSection(config) {
    var deferred =  $q.defer();
    configurationService.saveSection(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function updateSection(config) {
    var deferred =  $q.defer();
    configurationService.updateSection(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteSection(config) {
    var deferred =  $q.defer();
    configurationService.deleteSection(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function saveField(config) {
    var deferred =  $q.defer();
    configurationService.saveField(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function updateField(config) {
    var deferred =  $q.defer();
    configurationService.updateField(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteField(config) {
    var deferred =  $q.defer();
    configurationService.deleteField(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function getSingleFieldForProject(config) {
    var deferred =  $q.defer();
    configurationService.getSingleFieldForProject(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function saveAttribute(config) {
    var deferred =  $q.defer();
    configurationService.saveAttribute(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function updateAttribute(config) {
    var deferred =  $q.defer();
    configurationService.updateAttribute(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function deleteAttribute(config) {
    var deferred =  $q.defer();
    configurationService.deleteAttribute(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function updateParameter(config) {
    var deferred =  $q.defer();
    configurationService.updateParameter(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function generateProfileConfiguration(config) {
    var deferred =  $q.defer();
    configurationService.generateProfileConfiguration(config.projectId).then(function(configuration){
        deferred.resolve();
        console.log('configuration generated successfully');
    }).fail(function(err){
        console.log('Error in generating', err);
    });
    return deferred.promise;
}

function saveDynamicOptionToListField(config) {
    var deferred =  $q.defer();
    configurationService.saveDynamicOptionToListField(config).then(function(response){
        deferred.resolve(response);
    }).fail(function(err){
        deferred.reject(err)
    });
    return deferred.promise;
}

function deleteDynamicOptionFromListField(config) {
    var deferred =  $q.defer();
    configurationService.deleteDynamicOptionFromListField(config).then(function(response){
        deferred.resolve(response);
    }).fail(function(err){
        deferred.reject(err)
    });
    return deferred.promise;
}



module.exports = {
    getProjectConfiguration: getProjectConfiguration,

    saveSection: saveSection,
    updateSection: updateSection,
    deleteSection: deleteSection,

    saveField: saveField,
    updateField: updateField,
    deleteField: deleteField,

    getSingleFieldForProject: getSingleFieldForProject,
    saveAttribute: saveAttribute,
    updateAttribute: updateAttribute,
    deleteAttribute: deleteAttribute,

    updateParameter: updateParameter,
    generateProfileConfiguration: generateProfileConfiguration,

    saveDynamicOptionToListField: saveDynamicOptionToListField,
    deleteDynamicOptionFromListField: deleteDynamicOptionFromListField
}