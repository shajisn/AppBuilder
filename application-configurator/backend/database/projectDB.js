/**
 * Created by Jithu.jose on 1/29/2016.
 */
var path = require('path');
var projectModel = require(path.resolve('backend/database/projectModel'));
var $q = require('q');
var rs = require('random-strings');
var async = require('async');
var applications = [
    'WebApplication',
    'IOSApplication',
    'AndroidApplication'
];


function getDefaultApplications(){
    var arr = [];
    applications.forEach(function(application){
        arr.push({
            name: application,
            id: rs.numeric(20)
        });
    });
    return arr;
}
function saveProject(config){
    var deferred = $q.defer();
    var obj = {
        id: rs.numeric(20),
        name: config.name,
        description: config.description,
        applications: getDefaultApplications(),
        rules: [],
        fields: [],
        sections: []
    }
    var modelObj = new projectModel(obj);
    modelObj.save(function(err, result){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(obj);
        }
    });
    return deferred.promise;
}

function updateProject(project){
    var deferred =  $q.defer();
    projectModel.update({_id: project._id}, {$set: {
        name: project.name,
        description: project.description
    }}, function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(project);
        }
    });
    return deferred.promise;
}

function deleteProject(project){
    var deferred = $q.defer();
    projectModel.find({_id: project._id}).remove(function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(project);
        }
    });
    return deferred.promise;
}

function getAllProjects() {
    var deferred =  $q.defer();
    projectModel.find({}, function (err, result) {
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}

function getSingleProject(projectId) {
    var deferred =  $q.defer();
    projectModel.find({id: projectId}, function(err, result){
        if(err || !result.length){
            deferred.reject(err);
        }
        else{
            deferred.resolve(result[0]);
        }
    });
    return deferred.promise;
}

function saveApplication(config){
    var deferred =  $q.defer();
    var applicationObj = {
        name: config.application.name,
        description: config.application.description,
        id: rs.numeric(20)
    }
    projectModel.update({id: config.projectId}, {
        $addToSet: {applications: applicationObj}
    }, function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(applicationObj)
        }
    });
    return deferred.promise;
}

function updateApplication(config){
    var deferred =  $q.defer();
    projectModel.find({id: config.projectId})
        .update({'applications.id': config.application.id}, {
            $set: {
                'applications.$.name': config.application.name,
                'applications.$.description': config.application.description
            }
        }, function(err){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(config.application)
            }
        });
    return deferred.promise;
}

function deleteApplication(config){
    var deferred =  $q.defer();

    projectModel.update({id: config.projectId}, {
            $pull: {'applications': {id: config.application.id}}
        }, function(err){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(config.application)
            }
        });
    return deferred.promise;
}


function saveRule(config){
    var deferred =  $q.defer();
    var ruleObj = {
        name: config.rule.name,
        description: config.rule.description,
        id: rs.numeric(20),
        applicationId: config.rule.applicationId,
        profileId: config.rule.profileId
    };
    projectModel.update({id: config.projectId}, {
        $addToSet: {rules: ruleObj}
    }, function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(ruleObj);
        }
    });
    return deferred.promise;
}

function updateRule(config){
    var deferred =  $q.defer();
    projectModel.find({id: config.projectId})
        .update({'rules.id': config.rule.id}, {
            $set: {
                'rules.$.name': config.rule.name,
                'rules.$.description': config.rule.description,
                'rules.$.applicationId': config.rule.applicationId,
                'rules.$.profileId': config.rule.profileId
            }
        }, function(err){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(config.rule)
            }
        });
    return deferred.promise;
}

function deleteRule(config){
    var deferred =  $q.defer();

    projectModel.update({id: config.projectId}, {
        $pull: {'rules': {id: config.rule.id}}
    }, function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(config.rule)
        }
    });
    return deferred.promise;
}

//projectModel.find({'name': 'Sonyliv'},{'configuration.fields': '22291817262184586914'}, function(err, result){
//    console.log('err', err)
//    console.log('result', result[0].configuration)
//});

function getProjectConfiguration(projectId){
    var deferred = $q.defer();
    var selectQueryStr = 'sections fields';
    projectModel.find({id: projectId}, selectQueryStr, function(err, result){
        if(err || !result.length){
            deferred.reject(err || 'Empty results');
        }
        else{
            if(result[0].fields){
                var newArr = result[0].fields.filter(function(field){
                    return !field.parentId
                });
            }
            result[0].fields = newArr;
            deferred.resolve(result[0]);
        }
    });
    return deferred.promise;
}



function saveSection(config){
    var deferred =  $q.defer();
    var sectionObj = {
        name: config.section.name,
        description: config.section.description,
        id: rs.numeric(20)
    };
    projectModel.update({id: config.projectId}, {
        $addToSet: {'sections': sectionObj}
    }, function(err, result){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(sectionObj);
        }
    });
    return deferred.promise;
}

function updateSection(config){
    var deferred =  $q.defer();
    projectModel.find({id: config.projectId})
        .update({'sections.id': config.section.id}, {
            $set: {
                'sections.$.name': config.section.name,
                'sections.$.description': config.section.description
            }
        }, function(err){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(config.section);
            }
        });
    return deferred.promise;
}

function deleteSection(config){
    var deferred =  $q.defer();

    projectModel.update({id: config.projectId}, {
        $pull: {'sections': {id: config.id}}
    }, function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(config);
        }
    });
    return deferred.promise;
}

function saveField(config){
    var deferred =  $q.defer();
    var fieldObj = {
        name: config.field.name,
        key: config.field.key,
        type: config.field.type,
        sectionId: config.field.sectionId,
        id: rs.numeric(20),
        parameters: [
            {id: 'defaultValue', name: 'Default Value',type: 'text', value: ''}
        ]
    };
    if(config.field.type === 'complex'){
        fieldObj.attributes = [];
        fieldObj.parameters = [
            {
                id: 'repeatable',
                name: 'Repeatable',
                type: 'dropdown',
                value: '',
                options: [{id: 'yes', name: 'YES'},{id: 'no', name: 'NO'}]
            }
        ]
    }
    else if(config.field.type === 'list'){
        fieldObj.parameters.push({
            id: 'options',
            name: 'Options',
            type: 'dynamicDropdown',
            data: []
        });
    }
    projectModel.update({id: config.projectId}, {
        $addToSet: {'fields': fieldObj}
    }, function(err, result){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(fieldObj);
        }
    });
    return deferred.promise;
}

function updateField(config){
    var deferred =  $q.defer();
    projectModel.find({id: config.projectId})
        .update({'fields.id': config.field.id}, {
            $set: {
                'fields.$.name': config.field.name
            }
        }, function(err){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(config.field);
            }
        });
    return deferred.promise;
}

function deleteField(config){
    var deferred =  $q.defer();
    async.series([
        function(callback){
            projectModel.find({id: config.projectId}, 'fields', function(err, result){
                if(!err && result[0]){
                    result[0].fields.forEach(function(field){
                        if(field.id === config.id && field.attributes && field.attributes.length){
                            err = "Have child fields";
                        }
                    });
                }
                callback(err);
            });
        },
        function(callback){
            projectModel.update({id: config.projectId}, {
                $pull: {'fields': {id: config.id}}
            }, function(err){
                callback(err);
            });
        }
    ], function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(config);
        }
    });

    return deferred.promise;
}


//projectModel.findById({_id: '56b357900ae0fca020f8af44', 'configuration.fields.id': '91002312231188220400'}, {'configuration.fields.$': 1}, function(err, result){
//    console.log('err', err);
//    console.log('result', result[0].configuration);
//});
function getSingleFieldForProject(config){
    var deferred = $q.defer();
    projectModel.find({id: config.projectId}, 'fields', function(err, result){
        if(err || !result.length){
            deferred.reject(err);
        }
        else{
            var responseField = [];
            if(result[0] && result[0].fields){

            }
            result[0].fields.forEach(function(field){
                if(field.id === config.fieldId){
                    responseField = field;
                }
            });
            deferred.resolve(responseField)
        }
    });
    return deferred.promise;
}

function saveAttribute(config){
    var  deferred = $q.defer();
    var fieldObj = {
        name: config.field.name,
        key: config.field.key,
        type: config.field.type,
        parentId: config.field.parentId,
        id: rs.numeric(20),
        parameters: [
            {id: 'defaultValue', name: 'Default Value',type: 'text', data: ''}
        ]
    };
    if(config.field.type === 'complex'){
        fieldObj.attributes = [];
        fieldObj.parameters = [
            {
                id: 'repeatable',
                name: 'Repeatable',
                type: 'dropdown',
                value: '',
                options: [{id: 'yes', name: 'YES'},{id: 'no', name: 'NO'}]
            }
        ]
    }
    else if(config.field.type === 'list'){
        fieldObj.parameters.push({
            id: 'options',
            name: 'Options',
            type: 'dynamicDropdown',
            data: []
        });
    }
    var attrObj = {
        name: fieldObj.name,
        key: fieldObj.key,
        type: fieldObj.type,
        id: fieldObj.id
    };
    async.parallel([
        function(callback){
            projectModel.update({id: config.projectId}, {
                $addToSet: {'fields': fieldObj}
            }, function(err, result){
                callback(err);
            });
        },
        function(callback){
            projectModel.find({id: config.projectId})
                .update({'fields.id': config.field.parentId}, {
                    $set: {
                        'fields.$.childId': fieldObj.id
                    }
                }, function(err){
                    callback(err);
                });
        },
        function(callback){
            projectModel.find({id: config.projectId})
                .update({'fields.id': config.field.parentId}, {
                    $addToSet: {
                        'fields.$.attributes': attrObj
                    }
                }, function(err){
                    callback(err);
                });
        }
    ], function(err, result){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(fieldObj);
        }
    });
    projectModel.update({id: config.projectId}, {
        $addToSet: {'fields': fieldObj}
    }, function(err, result){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(fieldObj);
        }
    });
    return deferred.promise;
}

function updateAttribute(config){
    var deferred =  $q.defer();
    async.parallel([
        function(callback){
            projectModel.find({id: config.projectId})
                .update({'fields.id': config.attribute.parentId}, {
                    $set: {
                        'fields.attributes.$.name': config.attribute.name
                    }
                }, function(err){
                    callback(err);
                });
        },
        function(callback){
            projectModel.find({id: config.projectId})
                .update({'fields.id': config.attribute.id}, {
                    $set: {
                        'fields.$.name': config.attribute.name
                    }
                }, function(err){
                    callback(err);
                });
        }
    ], function(err, result){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(config.attribute);
        }
    });

    return deferred.promise;
}

function deleteAttribute(config){
    var deferred =  $q.defer();
    async.waterfall([
        function(callback){
            projectModel.find({id: config.projectId}, 'fields', function(err, result){
                if(!err){
                    var fields = result[0].fields;
                    for(var key in fields){
                        var field = fields[key];
                        if(field.id === config.attribute.id && field.attributes && field.attributes.length){
                            err = 'child fields exists';
                            break;
                        }
                    }
                }
                callback(err, fields);
            });
        },
        function(fields, callback){
            async.parallel([
                function(innerCallback){
                    projectModel.update({id: config.projectId}, {
                        $pull: {'fields': {id: config.attribute.id}}
                    }, function(err){
                        innerCallback(err);
                    });
                },
                function(innerCallback){
                    var newArr = [];
                    var hasParentField = false;
                    fields.forEach(function(field){
                        if(field.id === config.attribute.parentId){
                            hasParentField = true;
                            newArr = field.attributes.filter(function(attribute){
                                return attribute.id !== config.attribute.id
                            });
                        }
                    });
                    if(hasParentField){
                        projectModel.find({id: config.projectId})
                            .update({'fields.id': config.attribute.parentId}, {
                                $set: {
                                    'fields.$.attributes': newArr
                                }
                            }, function(err, result){
                                innerCallback(err);
                            });
                    }
                }
            ], function(err, result){
                callback(err);
            });
        }
    ], function(err, result){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(config.attribute);
        }
    })
    return deferred.promise;
}

function updateParameter(config){
    var deferred =  $q.defer();
    projectModel.find({id: config.projectId})
        .update({'fields.id': config.fieldId}, {
            $set: {
                'fields.$.parameters': config.parameters
            }
        }, function(err){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(config.parameters);
            }
        });
    return deferred.promise;
}

function generateAllFieldsForSingleProject(projectId){
    var deferred =  $q.defer();
    projectModel.find({id: projectId}, 'fields', function(err, result){
        if(err || !result.length || !result[0]){
            deferred.reject(err || 'empty data');
        }
        else{
            deferred.resolve(result[0].fields);
        }
    });
    return deferred.promise;
}

function addValueToComplexField(config){
    var deferred =  $q.defer();
    var valueObj = {
        id: rs.numeric(20),
        name: config.name
    };
    if(config.parentValueId){
        valueObj.parentValueId = config.parentValueId;
    }
    async.waterfall([
        function(callback){
            projectModel.find({id: config.projectId}, 'fields', function(err, result){
                if(err || !result.length || !result[0]){
                    err = err || 'empty data';
                }
                var valueList = [];
                var currentField = '';
                result[0].fields.forEach(function(field){
                     if(field.id === config.fieldId){
                         if(!field.valueList){
                             field.valueList = {};
                             field.valueList[config.profileId] = [];
                         }
                         else if(!field.valueList[config.profileId]){
                             field.valueList[config.profileId] = [];
                         }
                         field.valueList[config.profileId].push(valueObj);
                         currentField = field;
                     }
                });
                callback(err, currentField.valueList);
            });
        },
        function(valueList, callback){
            projectModel.find({id: config.projectId})
                .update({'fields.id': config.fieldId}, {
                    $set: {'fields.$.valueList': valueList}
                }, function(err, result){
                    callback(err);
                });
        }
    ], function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(valueObj);
        }
    });
    return deferred.promise;
}

function deleteValueFromComplexField(config){
    var deferred =  $q.defer();
    async.waterfall([
        function(callback){
            projectModel.find({id: config.projectId}, 'fields', function(err, result){
                if(err || !result.length || !result[0]){
                    err = err || 'empty data';
                }
                var valueList = [];
                var currentField = '';
                result[0].fields.forEach(function(field){
                     if(field.id === config.fieldId){
                         var newArr = field.valueList[config.profileId].filter(function(valueObj){
                             return valueObj.id !== config.valueObj.id
                         });
                         field.valueList[config.profileId] = newArr;
                         currentField = field;
                     }
                });
                callback(err, currentField.valueList);
            });
        },
        function(valueList, callback){
            projectModel.find({id: config.projectId})
                .update({'fields.id': config.fieldId}, {
                    $set: {'fields.$.valueList': valueList}
                }, function(err, result){
                    callback(err);
                });
        }
    ], function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(config.valueObj);
        }
    });
    return deferred.promise;
}

function saveDynamicOptionToListField(config){
    var deferred = $q.defer();
    config.selectOptionObj.id = rs.numeric(20);
    async.waterfall([
        function(callback){
            projectModel.find({id: config.projectId}, 'fields', function(err, result){
                var parameters = [];
                if(!err){
                    for(var key in result[0].fields){
                        var field = result[0].fields[key]
                        if(field.id === config.fieldId){
                            parameters = field.parameters;
                            parameters[1].data.push(config.selectOptionObj);
                            break;
                        }
                    }
                }
                callback(err, parameters);
            });
        },
        function(parameters, callback){
            projectModel.find({id: config.projectId})
                .update({'fields.id': config.fieldId}, {
                    $set: {'fields.$.parameters': parameters}
                }, function(err, result){
                    callback(err)
                });
        }
    ], function(err, result){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(config.selectOptionObj)
        }
    });
    return deferred.promise;
}

function deleteDynamicOptionFromListField(config){
    var deferred = $q.defer();
    async.waterfall([
        function(callback){
            projectModel.find({id: config.projectId}, 'fields', function(err, result){
                var parameters = [];
                if(!err){
                    for(var key in result[0].fields){
                        var field = result[0].fields[key]
                        if(field.id === config.fieldId){
                            parameters = field.parameters;
                            var newData = parameters[1].data.filter(function(option){
                                return option.id !== config.optionId
                            });
                            parameters[1].data = newData;
                            break;
                        }
                    }
                }
                callback(err, parameters);
            });
        },
        function(parameters, callback){
            projectModel.find({id: config.projectId})
                .update({'fields.id': config.fieldId}, {
                    $set: {'fields.$.parameters': parameters}
                }, function(err, result){
                    callback(err)
                });
        }
    ], function(err, result){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(config.optionId)
        }
    });
    return deferred.promise;
}



function getGlobalAndApplicationProfileId(config){
    var deferred = $q.defer();
    projectModel.find({id: config.projectId}, 'globalConfiguration rules', function(err, result){
        if(!err && result[0] && result[0].rules && result[0].rules.length){
            var selectedRuleArr = result[0].rules.filter(function(rule){
                return rule.id === config.ruleId;
            });
            var selectedRule = {};
            if(selectedRuleArr.length){
                selectedRule = selectedRuleArr[0];
            }
            deferred.resolve({
                applicationProfileId: selectedRule.profileId,
                globalProfileId: result[0].globalConfiguration.profileId,
            });
        }
        else{
            deferred.reject(err || 'Invalid Project or Rule Id');
        }
    });
    return deferred.promise;
}

function changeProfileIdInGlobalConfig(config){
    var deferred = $q.defer();
    projectModel.update({id: config.projectId}, {
        $set: {
            'globalConfiguration.profileId': config.profileId
        }
    }, function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(config.profileId);
        }
    });
    return deferred.promise;
}

module.exports = {
    saveProject: saveProject,
    updateProject: updateProject,
    deleteProject: deleteProject,

    getAllProjects: getAllProjects,
    getSingleProject: getSingleProject,

    saveApplication: saveApplication,
    updateApplication: updateApplication,
    deleteApplication: deleteApplication,

    saveRule: saveRule,
    updateRule: updateRule,
    deleteRule: deleteRule,

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

    generateAllFieldsForSingleProject: generateAllFieldsForSingleProject,
    addValueToComplexField: addValueToComplexField,
    deleteValueFromComplexField: deleteValueFromComplexField,

    saveDynamicOptionToListField: saveDynamicOptionToListField,
    deleteDynamicOptionFromListField: deleteDynamicOptionFromListField,

    getGlobalAndApplicationProfileId: getGlobalAndApplicationProfileId,
    changeProfileIdInGlobalConfig: changeProfileIdInGlobalConfig
}