/**
 * Created by Jithu.jose on 2/25/2016.
 */
var path = require('path');
var TemplateModel = require(path.resolve('backend/database/templateModel'));
var $q = require('q');
var async = require('async');
var rs = require('random-strings');

function getAllTemplates() {
    var deferred =  $q.defer();
    TemplateModel.find({}, '-configuration -fields', function(err, templates){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(templates);
        }
    });
    return deferred.promise;
}

function getSingleTemplate(config) {
    var deferred =  $q.defer();
    TemplateModel.find({id: config.id}, function(err, response){
        if(err || !response || !response[0]){
            deferred.reject(err);
        }
        else{
            if(response[0].fields){
                var newFields = response[0].fields.filter(function(field){
                    return field.parentId == config.parentFieldId;
                });
                response[0].fields = newFields;
            }
            deferred.resolve(response[0]);
        }
    });
    return deferred.promise;
}

function saveTemplate(config) {
    var deferred =  $q.defer();
    var obj = {
        id: rs.numeric(20),
        name: config.name,
        ovp: config.ovp,
        description: config.description,
        ovpUrl: config.ovpUrl,
        ovpUrlType: config.ovpUrlType,
        action: {},
        fields: []
    };
     obj.action.get = config.action.get;
     obj.action.post = config.action.post;
     obj.action.put = config.action.put;
     obj.action.delete = config.action.delete;

    var templateObj = new TemplateModel(obj);
    templateObj.save(function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(obj);
        }
    });
    return deferred.promise;
}
function updateTemplate(config) {
    var deferred =  $q.defer();
    var action = {};
    // action[config.action] = config.url;
    TemplateModel.update({id: config.id}, {
        $set: {
            'name': config.name,
            'description': config.description,
            'action.get': config.action.get,
            'action.post': config.action.post,
            'action.put': config.action.put,
            'action.delete': config.action.delete
        }
    }, function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(config)
        }
    });
    return deferred.promise;
}
function deleteTemplate(templateId) {
    var deferred =  $q.defer();
    async.series([
        function(callback){
            TemplateModel.find({id: templateId}, function(err, result){
                if(!err){
                    if(result[0].fields.length){
                        err = 'Has fields list'
                    }
                }
                callback(err);
            });
        },
        function(callback){
            TemplateModel.find({id: templateId}).remove(function(err){
                callback(err);
            })
        }
    ], function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(templateId)
        }
    });

    return deferred.promise;
}

function saveField(config) {
    var deferred =  $q.defer();
    var fieldObj = {
        id: rs.numeric(20),
        name: config.fieldObj.name,
        type: config.fieldObj.type,
        value: config.fieldObj.value,
        description: config.fieldObj.description
    };
    if(config.parentId){
        fieldObj.parentId = config.parentId;
    }
    async.parallel([
        function(callback){
            TemplateModel.update({id: config.templateId}, {
                $addToSet: {'fields': fieldObj}
            }, function(err){
                callback(err);
            });
        },
        function(callback){
            if(config.parentId){
                TemplateModel.find({id: config.templateId})
                    .update({'fields.id': config.parentId}, {
                        $addToSet: {'fields.$.children': fieldObj.id}
                    }, function(err){
                        callback(err);
                    });
            }
            else{
                callback(null);
            }
        }
    ], function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(fieldObj);
        }
    });

    return deferred.promise;
}
function updateField(config) {
    var deferred =  $q.defer();
    TemplateModel.find({id: config.templateId})
        .update({'fields.id': config.fieldObj.id}, {
            $set: {
                'fields.$.name': config.fieldObj.name,
                'fields.$.description': config.fieldObj.description,
                'fields.$.value': config.fieldObj.value
            }
        }, function(err){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(config.fieldObj);
            }
        });
    return deferred.promise;
}
function deleteField(config) {
    var deferred =  $q.defer();
    async.waterfall([
        function(callback){
            TemplateModel.find({id: config.templateId}, 'fields', function(err, result){
                if(!err && result[0]){
                    for(var key in result[0].fields){
                        var field = result[0].fields[key];
                        if(field.id === config.fieldId && field.children && field.children.length){
                            err = "Have child fields";
                        }
                    }
                }
                callback(err, result[0].fields);
            });
        },
        function(fields, callback){
            fields.forEach(function(field, index){
                if(field.id === config.fieldId){
                    fields.splice(index, 1)
                }
                else if(field.id === config.parentFieldId){
                    field.children.splice(field.children.indexOf(config.fieldId), 1);
                }
            });
            TemplateModel.update({id: config.templateId}, {
                $set: {
                    'fields': fields
                }
            }, function(err){
                callback(err);
            });
        }
    ], function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(config.fieldId);
        }
    });
    return deferred.promise;
}

function getAllFieldsInSingleTemplate(templateId){
    var deferred = $q.defer();
    TemplateModel.find({id: templateId}, 'fields', function(err, result){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(result[0].fields);
        }
    });
    return deferred.promise;
}
function saveTemplateConfiguration(templateId, configuration){
    var deferred = $q.defer();
    TemplateModel.update({id: templateId}, {
        $set: {configuration: configuration}
    }, function(err, result){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve();
        }
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

    getAllFieldsInSingleTemplate: getAllFieldsInSingleTemplate,
    saveTemplateConfiguration: saveTemplateConfiguration
};