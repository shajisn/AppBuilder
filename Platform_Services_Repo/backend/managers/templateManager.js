/**
 * Created by Jithu.jose on 2/25/2016.
 */

var path = require('path');
var templateService = require(path.resolve('backend/services/templateService'));
var $q = require('q');

function getAllTemplates(config) {
    var deferred =  $q.defer();
    templateService.getAllTemplates(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function getSingleTemplate(config) {
    var deferred =  $q.defer();
    templateService.getSingleTemplate(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function saveTemplate(config) {
    var deferred =  $q.defer();
    templateService.saveTemplate(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function updateTemplate(config) {
    var deferred =  $q.defer();
    templateService.updateTemplate(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteTemplate(config) {
    var deferred =  $q.defer();
    templateService.deleteTemplate(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function saveField(config) {
    var deferred =  $q.defer();
    templateService.saveField(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function updateField(config) {
    var deferred =  $q.defer();
    templateService.updateField(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteField(config) {
    var deferred =  $q.defer();
    templateService.deleteField(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function deleteField(config) {
    var deferred =  $q.defer();
    templateService.deleteField(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function generateTemplateConfiguration(config) {
    var deferred =  $q.defer();
    templateService.generateTemplateConfiguration(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

module.exports = {
    getAllTemplates: getAllTemplates,
    getSingleTemplate: getSingleTemplate,

    saveTemplate: saveTemplate,
    updateTemplate: updateTemplate,
    deleteTemplate: deleteTemplate,

    saveField: saveField,
    updateField: updateField,
    deleteField: deleteField,

    generateTemplateConfiguration: generateTemplateConfiguration
};