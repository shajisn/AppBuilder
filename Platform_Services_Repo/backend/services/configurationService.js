/**
 * Created by Jithu.jose on 2/8/2016.
 */

var path = require('path');
var async = require('async');
var projectDB = require(path.resolve('backend/database/projectDB'));
var profileDB = require(path.resolve('backend/database/profileDB'));
var helper = require(path.resolve('backend/commons/helper'));
var GLOBALS = require(path.resolve('backend/globals'));
var $q = require('q');

function getProjectConfiguration(config) {
    var deferred =  $q.defer();
    projectDB.getProjectConfiguration(config.projectId).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function saveSection(config) {
    var deferred =  $q.defer();
    projectDB.saveSection(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function updateSection(config) {
    var deferred =  $q.defer();
    projectDB.updateSection(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteSection(config) {
    var deferred =  $q.defer();
    projectDB.deleteSection(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function saveField(config) {
    var deferred =  $q.defer();
    projectDB.saveField(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function updateField(config) {
    var deferred =  $q.defer();
    projectDB.updateField(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteField(config) {
    var deferred =  $q.defer();
    projectDB.deleteField(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function getSingleFieldForProject(config) {
    var deferred =  $q.defer();
    projectDB.getSingleFieldForProject(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function saveAttribute(config) {
    var deferred =  $q.defer();
    projectDB.saveAttribute(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function updateAttribute(config) {
    var deferred =  $q.defer();
    projectDB.updateAttribute(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function deleteAttribute(config) {
    var deferred =  $q.defer();
    projectDB.deleteAttribute(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function updateParameter(config) {
    var deferred =  $q.defer();
    projectDB.updateParameter(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function generateProfileConfiguration(projectId) {
    var deferred =  $q.defer();

    projectDB.generateAllFieldsForSingleProject(projectId).then(function(fields) {
        updateAllProfilesConfigurationForSingleProject(projectId, fields).then(function(){
            deferred.resolve()
        }).fail(function(err){
            deferred.reject(err);
        })
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function updateAllProfilesConfigurationForSingleProject(projectId, fields){
    var deferred = $q.defer();
    var baseFields = getBaseFieldsFromFields(fields);
    var profileConfigurationResArray = []
    profileDB.getAllProfilesConfigurationForSingleProject(projectId).then(function(profiles){
        profiles.forEach(function(profile){
            if(typeof profile.configuration !== 'object'){
                profile.configuration = {};
            }
            generateKeysForProfileConfiguration(profile.configuration, {
                baseFields: baseFields,
                fields: fields
            });
            profileConfigurationResArray.push(profileDB.saveProfileConfiguration(profile));
        });
        $q.all(profileConfigurationResArray).then(function(response){
            deferred.resolve(response);
        }).fail(function(err){
            deferred.reject(err);
        });
    }).fail(function(err){
        deferred.reject(err);
    });
    return deferred.promise;
}
function getBaseFieldsFromFields(fields){
    var baseFields = fields.filter(function(field){
        return !field.parentId
    });
    return baseFields;
}
function getFieldByFieldId(fieldId, fields){
    var fieldArr = fields.filter(function(field){
        return field.id === fieldId;
    });
    return fieldArr[0];
}
function getBaseFieldFromField(currentField, fields){
    var fieldsObj = helper.convertArrayToObjectById(fields);
    var getParentField = function(field){
        var parentField = fieldsObj[field.parentId];
        if(parentField.parent){
            getParentField(parentField);
        }
        else{
            return parentField;
        }
    };
    return getParentField(currentField);;
}
function generateKeysForProfileConfiguration(configuration, options){
    //var fieldsObj = helper.convertArrayToObjectById(options.fields);
    var baseKeyArr = ['_value_id'];
    options.baseFields.forEach(function(baseField){
        baseKeyArr.push(baseField.key);
    });
    for(var key in configuration){
        if(baseKeyArr.indexOf(key) === -1){
            delete configuration[key];
        }
    }
    options.baseFields.forEach(function(baseField){
        setBaseKeyInConfiguration(configuration, baseField, options.fields);
    });
}
function setBaseKeyInConfiguration(configuration, baseField, fields){
    if(baseField.type == GLOBALS.FIELD_TYPES.COMPLEX){
        if(!configuration[baseField.key]){
            if(baseField.parameters[0].value === 'no'){
                configuration[baseField.key] = {}
            }
            else{
                configuration[baseField.key] = [];
            }

        }
        processComplexField(configuration[baseField.key], baseField, fields);
    }
    else if(baseField.type == GLOBALS.FIELD_TYPES.LIST){
        processListField(configuration, baseField, fields);
    }
    else if(baseField.type == GLOBALS.FIELD_TYPES.TEXT){
        processTextField(configuration, baseField, fields);
    }
    else if(baseField.type == GLOBALS.FIELD_TYPES.TEMPLATE){
        processTemplateField(configuration, baseField, fields);
    }
    else if(baseField.type == GLOBALS.FIELD_TYPES.BOOLEAN){
        processBooleanField(configuration, baseField, fields);
    }
}
function processComplexField(configElement, parentField, fields){
    var childFields = findChildFieldsFromParentField(parentField, fields);
    if(parentField.parameters[0].value === 'no'){
        childFields.forEach(function(childField){
            if(childField.type === GLOBALS.FIELD_TYPES.COMPLEX){
                if(!configElement[childField.key]){
                    if(childField.parameters[0].value === 'no'){
                        configElement[childField.key] = {}
                    }
                    else{
                        configElement[childField.key] = [];
                    }
                }
                processComplexField(configElement[childField.key], childField, fields);
            }
            else if(childField.type == GLOBALS.FIELD_TYPES.LIST){
                processListField(configElement, childField, fields);
            }
            else if(childField.type == GLOBALS.FIELD_TYPES.TEXT){
                processTextField(configElement, childField, fields);
            }
            else if(childField.type == GLOBALS.FIELD_TYPES.TEMPLATE){
                processTemplateField(configElement, childField, fields);
            }
            else if(childField.type == GLOBALS.FIELD_TYPES.BOOLEAN){
                processBooleanField(configElement, childField, fields);
            }
        });
    }
    else{
        if(!configElement.length){
            var keyValueObj = {};
            configElement.push(keyValueObj);
            childFields.forEach(function(childField){
                if(childField.type === GLOBALS.FIELD_TYPES.COMPLEX){
                    if(childField.parameters[0].value === 'no'){
                        keyValueObj[childField.key] = {}
                    }
                    else{
                        keyValueObj[childField.key] = [];
                    }
                    processComplexField(keyValueObj[childField.key], childField, fields);
                }
                else if(childField.type == GLOBALS.FIELD_TYPES.LIST){
                    processListField(keyValueObj, childField, fields);
                }
                else if(childField.type == GLOBALS.FIELD_TYPES.TEXT){
                    processTextField(keyValueObj, childField, fields);
                }
                else if(childField.type == GLOBALS.FIELD_TYPES.TEMPLATE){
                    processTemplateField(keyValueObj, childField, fields);
                }
                else if(childField.type == GLOBALS.FIELD_TYPES.BOOLEAN){
                    processBooleanField(keyValueObj, childField, fields);
                }
            });
        }
        else{
            configElement.forEach(function(configElementObj){
                var childKeyArr = ['_value_id'];
                childFields.forEach(function(childField){
                    childKeyArr.push(childField.key);
                });
                for(var key in configElementObj){
                    if(childKeyArr.indexOf(key) === -1){
                        delete configElementObj[key];
                    }
                }
                childFields.forEach(function(childField){
                    if(childField.type === GLOBALS.FIELD_TYPES.COMPLEX){
                        if(!configElementObj[childField.key]){
                            if(childField.parameters[0].value === 'no'){
                                configElementObj[childField.key] = {};
                            }
                            else{
                                configElementObj[childField.key] = [];
                            }
                        }
                        else{
                            if(childField.parameters[0].value === 'no'){
                                if(configElementObj[childField.key].length >= 0){
                                    configElementObj[childField.key] = {};
                                }
                            }

                        }
                        processComplexField(configElementObj[childField.key], childField, fields);
                    }
                    else if(childField.type == GLOBALS.FIELD_TYPES.LIST){
                        processListField(configElementObj, childField, fields);
                    }
                    else if(childField.type == GLOBALS.FIELD_TYPES.TEXT){
                        processTextField(configElementObj, childField, fields);
                    }
                    else if(childField.type == GLOBALS.FIELD_TYPES.TEMPLATE){
                        processTemplateField(configElementObj, childField, fields);
                    }
                    else if(childField.type == GLOBALS.FIELD_TYPES.BOOLEAN){
                        processBooleanField(configElementObj, childField, fields);
                    }
                });
            });
        }
    }
}
function findChildFieldsFromParentField(parentField, fields){
    var childFields = [];
    var children = [];
    parentField.attributes.forEach(function(attribute){
        children.push(attribute.id);
    });
    fields.forEach(function(field){
        if(children.indexOf(field.id) !== -1){
            childFields.push(field);
        }
    });
    return childFields;
}
function processListField(configElement, parentField){
    if(!configElement[parentField.key]){
        configElement[parentField.key] = '';
    }
}
function processTextField(configElement, parentField){
    if(!configElement[parentField.key]){
        configElement[parentField.key] = '';
    }
}

function processTemplateField(configElement, parentField){
    if(!configElement[parentField.key]){
        configElement[parentField.key] = '';
    }
}

function processBooleanField(configElement, parentField){
    if(!configElement[parentField.key]){
        configElement[parentField.key] = '';
    }
}

function updateComplexFieldInConfiguration(config){
    var deferred = $q.defer();
    async.waterfall([
        function(callback){
            projectDB.generateAllFieldsForSingleProject(config.projectId).then(function(fields) {
                callback(null, fields);
            }).fail(function(err){
                callback(err);
            });
        },
        function(fields, callback){
            var currentField = getFieldByFieldId(config.fieldId, fields);
            profileDB.getSingleProfile(config.profileId).then(function(profile){
                setComplexValueInConfiguration(profile.configuration, {
                    valueIdKeyObjectArr: config.valueIdKeyObjectArr || [],
                    currentField: currentField,
                    fields: fields,
                    valueObj: config.valueObj
                });
                profileDB.saveProfileConfiguration(profile).then(function(response){
                    callback(null, profile.configuration);
                }).fail(function(err){
                    callback(err);
                });
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
function setComplexValueInConfiguration(configuration, options){
    var currentField = options.currentField;
    var valueIdKeyObjectArr = options.valueIdKeyObjectArr;
    var currentElement = configuration;
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

    var valueAdded = false;
    currentElement[currentField.key].forEach(function(config){
        if(!config._value_id){
            config._value_id = options.valueObj.id;
            valueAdded = true;
        }
    });
    if(!valueAdded){
        var tempArr = [];
        processComplexField(tempArr, options.currentField, options.fields);
        tempArr[0]._value_id = options.valueObj.id;
        currentElement[currentField.key].push(tempArr[0]);
    }
}

function deleteComplexFieldFromConfiguration(config){
    var deferred = $q.defer();
    async.waterfall([
        function(callback){
            projectDB.generateAllFieldsForSingleProject(config.projectId).then(function(fields) {
                callback(null, fields);
            }).fail(function(err){
                callback(err);
            });
        },
        function(fields, callback){
            var currentField = getFieldByFieldId(config.fieldId, fields);
            profileDB.getSingleProfile(config.profileId).then(function(profile){
                unsetComplexValueInConfiguration(profile.configuration, {
                    valueIdKeyObjectArr: config.valueIdKeyObjectArr || [],
                    currentField: currentField,
                    fields: fields,
                    valueObj: config.valueObj
                });
                profileDB.saveProfileConfiguration(profile).then(function(response){
                    callback(null, profile.configuration);
                }).fail(function(err){
                    callback(err);
                });
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
function unsetComplexValueInConfiguration(configuration, options){
    var currentField = options.currentField;
    var valueIdKeyObjectArr = options.valueIdKeyObjectArr;
    var currentElement = configuration;
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
    if(currentElement[currentField.key].length === 1){
        delete currentElement[currentField.key][0]._value_id;
    }
    else{
        var newArr = currentElement[currentField.key].filter(function(config){
            return config._value_id !== options.valueObj.id
        });
        currentElement[currentField.key] = newArr;
    }
}

function saveDynamicOptionToListField(config){
    var deferred = $q.defer();
    projectDB.saveDynamicOptionToListField(config).then(function(resposne){
        deferred.resolve(resposne);
    }).fail(function(err){
        deferred.reject(err);
    });
    return deferred.promise;
}

function deleteDynamicOptionFromListField(config){
    var deferred = $q.defer();
    projectDB.deleteDynamicOptionFromListField(config).then(function(resposne){
        deferred.resolve(resposne);
    }).fail(function(err){
        deferred.reject(err);
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
    updateComplexFieldInConfiguration: updateComplexFieldInConfiguration,
    deleteComplexFieldFromConfiguration: deleteComplexFieldFromConfiguration,

    saveDynamicOptionToListField: saveDynamicOptionToListField,
    deleteDynamicOptionFromListField: deleteDynamicOptionFromListField
}