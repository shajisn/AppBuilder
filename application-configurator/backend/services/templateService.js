/**
 * Created by Jithu.jose on 2/25/2016.
 */

var path = require('path');
var templateDB = require(path.resolve('backend/database/templateDB'));
var helper = require(path.resolve('backend/commons/helper'));
var $q = require('q');

function getAllTemplates(config) {
    var deferred =  $q.defer();
    templateDB.getAllTemplates(config).then(function (templates) {
        deferred.resolve({data: templates});
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function getSingleTemplate(config) {
    var deferred =  $q.defer();
    templateDB.getSingleTemplate(config).then(function (templates) {
        deferred.resolve({data: templates});
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function saveTemplate(config) {
    var deferred =  $q.defer();
    templateDB.saveTemplate(config).then(function (templateObj) {
        deferred.resolve({data :templateObj});
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function updateTemplate(config) {
    var deferred =  $q.defer();
    templateDB.updateTemplate(config).then(function(templateObj) {
        deferred.resolve({data :templateObj});
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteTemplate(config) {
    var deferred =  $q.defer();
    templateDB.deleteTemplate(config.id).then(function(templateId) {
        deferred.resolve({data :templateId});
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function saveField(config) {
    var deferred =  $q.defer();
    templateDB.saveField(config).then(function (fieldObj) {
        deferred.resolve({data :fieldObj});
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function updateField(config) {
    var deferred =  $q.defer();
    templateDB.updateField(config).then(function(fieldObj) {
        deferred.resolve({data :fieldObj});
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteField(config) {
    var deferred =  $q.defer();
    templateDB.deleteField(config).then(function(fieldId) {
        deferred.resolve({data :fieldId});
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function generateTemplateConfiguration(config) {
    var deferred =  $q.defer();
    templateDB.getAllFieldsInSingleTemplate(config.id).then(function(fields){
        var configuration = generateConfiguration(fields);
        templateDB.saveTemplateConfiguration(config.id, configuration).then(function(response){
            deferred.resolve();
        }).fail(function(err){
            deferred.reject(err);
        });
    }).fail(function(err){
        deferred.reject(err);
    });
    return deferred.promise;
}

function generateConfiguration(fields){
    var fieldObject = helper.convertArrayToObjectById(fields);
    var configuration = {};
    var baseFields = getBaseFieldsFromFields(fields);
    baseFields.forEach(function(baseField){
        processFields(configuration, baseField)
    });
    function processFields(configuration, field){
        if(field.type === 'string'){
            processStringField(configuration, field);
        }
        else if(field.type === 'object'){
            processObjectField(configuration, field);
        }
        else if(field.type === 'array'){
            if(field.children && field.children.length){
                processArrayField(configuration, field);
            }
            else{
                processStringField(configuration, field);
            }

        }

        function processStringField(configuration, field){
            configuration[field.name] = field.value
        }
        function processObjectField(configuration, field){
            var childConfig = {};
            configuration[field.name] = childConfig;
            field.children.forEach(function(childId){
                processFields(childConfig, fieldObject[childId]);
            });
        }
        function processArrayField(configuration, field){
            var childConfig = {};
            configuration[field.name] = [field.value, childConfig];
            field.children.forEach(function(childId){
                processFields(childConfig, fieldObject[childId]);
            });
        }
    }
    return configuration;
}

function getBaseFieldsFromFields(fields){
    return fields.filter(function(field){
        return !field.parentId;
    });
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