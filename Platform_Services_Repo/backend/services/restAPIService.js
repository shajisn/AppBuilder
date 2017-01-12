/**
 * Created by Jithu.jose on 3/2/2016.
 */

var path = require('path');
var $q = require('q');
var formidable = require('formidable');
var fs = require('fs');
var async = require('async');
var projectDB = require(path.resolve('backend/database/projectDB'));
var profileDB = require(path.resolve('backend/database/profileDB'));
var templateDB = require(path.resolve('backend/database/templateDB'));
var restClient = require(path.resolve('backend/commons/restClient'));
var jsonTransform = require('jsonpath-object-transform');
var config = require(path.resolve('backend/config'));
var assert = require('assert');
var errors = require(path.resolve('backend/commons/errors'))
var reqMethods = ['post', 'get', 'put', 'delete'];

function getProjectConfiguration(data) {
    var deferred =  $q.defer();
    async.waterfall([
        function(callback){
            projectDB.getGlobalAndApplicationProfileId(data).then(function(response){
                callback(null, response);
            }).fail(function(err){
                callback(err);
            })
        },
        function(config, callback){
            profileDB.getGlobalAndLocalProfiles(config).then(function(response){
                processConfigurations(response.globalConfig, response.applicationConfig);
                callback(null, response.globalConfig);
            }).fail(function(err){
                callback(err)
            })
        }
    ], function(err, result){
        if(!err && result){
            deferred.resolve(result);
        }
        else{
            deferred.reject(err || 'No Profile Configuration Exists');
        }
    });
    return deferred.promise;
}

function processConfigurations(globalConfig, applicationConfig){

    var processString = function(primaryConfig, secondaryConfig, key){
        if(secondaryConfig[key]){
            primaryConfig[key] = secondaryConfig[key];
        }
        else{
            primaryConfig[key] = primaryConfig[key];
        }
    };
    var processArray = function(primaryConfig, secondaryConfig, key){
        if(secondaryConfig[key].length){
            secondaryConfig[key].forEach(function(subConfig, index){
                if(!primaryConfig[key][index]){
                    primaryConfig[key][index] = subConfig;
                }
                else{
                    processConfigurations(primaryConfig[key][index], subConfig)
                }

            });
        }
        else{
            primaryConfig[key].forEach(function(subConfig, index){
                if(!secondaryConfig[key][index]){
                    secondaryConfig[key][index] = {};
                }
                else{
                    processConfigurations(subConfig, secondaryConfig[key][index])
                }

            });
        }

    };

    Object.keys(globalConfig).forEach(function(key){
        if(typeof globalConfig[key] !== 'object'){
            processString(globalConfig, applicationConfig, key);
        }
        else{
            if(globalConfig[key].constructor === Array){
                processArray(globalConfig, applicationConfig, key)
            }
            else{
                processConfigurations(globalConfig[key], applicationConfig[key])
            }
        }
    });

}

/**
 * @param config object
 */
function getData(config){
    var deferred =  $q.defer();
    async.waterfall([
        function(callback){
            templateDB.getSingleTemplate({id: config.templateId}).then(function(template){
                callback(null, template);
            }).fail(function(err){
                callback(err);
            });
        },
        function(template, callback){
            var responseArr = [];
            responseArr.push(template);
            var url = template.action.get;
            if(!url){
                callback(config.ERRORS.EMPTY_URL_IN_TEMPLATE);
                return;
            }
            for(var key in config.data){
                url = url.replace('@'+key+'@', config.data[key]);
            }
            restClient.get(url).then(function(response){
                responseArr.push(response);
                callback(null, responseArr);
            }).fail(function(err){
                callback(err);
            });
        }
    ], function(err, result){
        if(!err){
            var template = result[0];
            var originalJSON = JSON.parse(result[1].response);
            var templateJSON = template.configuration;
            var transformedJSON = jsonTransform(originalJSON, templateJSON);
            deferred.resolve(transformedJSON);
        }
        else{
            deferred.reject(err);
        }
    });
    return deferred.promise;
}

//For bot post and put requests

/**
 * @param config object
 */
function setData(config){
    var deferred =  $q.defer();
    async.waterfall([
        function(callback){
            templateDB.getSingleTemplate({id: config.templateId}).then(function(template){
                callback(null, template);
            }).fail(function(err){
                callback(err);
            });
        },
        function(template, callback){
            if(reqMethods.indexOf(config.method) === -1){
                callback(config.ERRORS.INVALID_METHOD);
                return;
            }
            var url = template.action[config.method];
            if(!url){
                callback(config.ERRORS.EMPTY_URL_IN_TEMPLATE);
                return;
            }
            var data = jsonTransform(config.data, template.configuration);
            restClient[config.method](url, data).then(function(response){
                callback(null, response);
            }).fail(function(err){
                callback(err);
            });
        }
    ], function(err, result){
        if(!err){
            deferred.resolve(result);
        }
        else{
            deferred.reject(err);
        }
    });
    return deferred.promise;
}

function deleteData(config){
    var deferred =  $q.defer();
    async.waterfall([
        function(callback){
            templateDB.getSingleTemplate({id: config.templateId}).then(function(template){
                callback(null, template);
            }).fail(function(err){
                callback(err);
            });
        },
        function(template, callback){
            var url = template.action.delete;
            if(!url){
                callback(config.ERRORS.EMPTY_URL_IN_TEMPLATE);
                return;
            }
            restClient.deleteReq(url, config.data).then(function(response){
                callback(null, response);
            }).fail(function(err){
                callback(err);
            });
        }
    ], function(err, result){
        if(!err){
            deferred.resolve(result);
        }
        else{
            deferred.reject(err);
        }
    });
    return deferred.promise;
}

/**
 * Function created to process form upload // image uploading
 * @param req request object
 * @params type
 */
function setDataFromForm(req){
    var deferred = $q.defer();
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        if(!err){
            var fileKey = '',
                fileName = '',
                currentFilePath = '';
            if(Object.keys(files).length){
                fileKey = fields.fileKey;
                fileName = files[fileKey].name;
                currentFilePath = files[fileKey].path;
            }


            var data = JSON.parse(fields.data),
                method = fields.method,
                fieldWrapperKey = fields.fieldWrapperKey,
                templateId = fields.templateId;

                async.waterfall([
                    function(asyncCallback){
                        templateDB.getSingleTemplate({id: templateId}).then(function(template){
                            asyncCallback(null, template);
                        }).fail(function(err){
                            asyncCallback(err);
                        });
                    },
                    function(template, asyncCallback){
                        if(reqMethods.indexOf(method) === -1){
                            asyncCallback(config.ERRORS.INVALID_METHOD);
                            return;
                        }
                        var url = template.action[method];
                        if(!url){
                            asyncCallback(config.ERRORS.EMPTY_URL_IN_TEMPLATE);
                            return;
                        }
                        var originalJSON = {};
                        var transformedJSON  = {};
                        originalJSON[fieldWrapperKey] = [data[fieldWrapperKey]];
                        data = jsonTransform(originalJSON, template.configuration);
                        transformedJSON = data[fieldWrapperKey][0];
                        restClient.postFormData(url, transformedJSON, {
                            filePath: currentFilePath,
                            fileKey: fileKey,
                            fileName: fileName,
                            fieldWrapperKey: fieldWrapperKey,
                            method: method
                        }).then(function(response){
                            asyncCallback(null, response);
                        }).fail(function(err){
                            asyncCallback(err);
                        });
                    }
                ], function(err, result){
                    fs.unlink(currentFilePath, function(err){
                        if(err){
                            console.log('::ERROR IN DELETING FILE::', new Date());
                            console.log(err);
                        }
                    });
                    if(err){
                        deferred.reject(err);
                    }
                    deferred.resolve(result);
                })

        }
        else{
            deferred.reject(err);
        }
    });
    return deferred.promise;
}

/**
 * @param config object
 */
function getBandData(config){
    var deferred =  $q.defer();
    if(!config.projectId || !config.ruleId){
        var errorMessage = new errors.ErrorMessage(errors.errorTypes.MANDATORY_FIELDS_MISSING)
            .appendMessages('ProjectId or RuleId is missing')
            .generate();
        deferred.reject(errorMessage);
        return deferred.promise;
    }
    var configuration = GLOBAL.configurations[config.projectId + '_' + config.ruleId];
    //assert(configuration, 'Get Project configuration api is not invoked');
    if(!configuration){
        var errorMessage = new errors.ErrorMessage(errors.errorTypes.EMPTY_VALUES)
            .appendMessages('Project Configuration not available invoke getProjectConfiguration API')
            .generate();
        deferred.reject(errorMessage);
        return deferred.promise;
    }

    var bands = configuration.bands;
    var temp = [];
    bands.forEach(function(band){
        if(band.id === config.bandId) {
            temp.push(band);
        }
    });
    deferred.resolve(temp);
    return deferred.promise;
}

/**
 * @param config object
 */
function getFormData(config){
    var deferred =  $q.defer();
    if(!config.projectId || !config.ruleId){
        var errorMessage = new errors.ErrorMessage(errors.errorTypes.MANDATORY_FIELDS_MISSING)
            .appendMessages('ProjectId or RuleId is missing')
            .generate();
        deferred.reject(errorMessage);
        return deferred.promise;
    }
    var configuration = GLOBAL.configurations[config.projectId + '_' + config.ruleId];
    //assert(configuration, 'Get Project configuration api is not invoked');
    if(!configuration){
        var errorMessage = new errors.ErrorMessage(errors.errorTypes.EMPTY_VALUES)
            .appendMessages('Project Configuration not available invoke getProjectConfiguration API')
            .generate();
        deferred.reject(errorMessage);
        return deferred.promise;
    }
    var forms = configuration.forms;
    var temp = [];
    forms.forEach(function(form){
        if(form.id === config.formId) {
            temp.push(form);
        }
    });
    deferred.resolve(temp);
    return deferred.promise;
}



/**
 * @param config object
 */
function getCRUDData(config){
    var deferred =  $q.defer();
    if(!config.projectId || !config.ruleId){
        var errorMessage = new errors.ErrorMessage(errors.errorTypes.MANDATORY_FIELDS_MISSING)
            .appendMessages('ProjectId or RuleId is missing')
            .generate();
        deferred.reject(errorMessage);
        return deferred.promise;
    }
    var configuration = GLOBAL.configurations[config.projectId + '_' + config.ruleId];
    //assert(configuration, 'Get Project configuration api is not invoked');
    if(!configuration){
        var errorMessage = new errors.ErrorMessage(errors.errorTypes.EMPTY_VALUES)
            .appendMessages('Project Configuration not available invoke getProjectConfiguration API')
            .generate();
        deferred.reject(errorMessage);
        return deferred.promise;
    }
    var cruds = configuration.crud_layouts;
    var temp = [];
    cruds.forEach(function(crud){
        if(crud.id === config.crudId) {
            crud.formData = configuration.forms.filter(function(form){
                return form.id === crud.form_id;
            })[0];
            temp.push(crud);
        }
    });
    deferred.resolve(temp[0]);
    return deferred.promise;
}

module.exports = {
    getProjectConfiguration: getProjectConfiguration,
    getData: getData,
    setData: setData,
    deleteData: deleteData,
    setDataFromForm: setDataFromForm,
    getBandData: getBandData,
    getFormData: getFormData,
    getCRUDData: getCRUDData
};

