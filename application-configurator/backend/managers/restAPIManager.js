/**
 * Created by Jithu.jose on 3/2/2016.
 */
/**
 * Created by Jithu.jose on 2/2/2016.
 */

var path = require('path');
var restAPIService = require(path.resolve('backend/services/restAPIService'));
var errors = require(path.resolve('backend/commons/errors'));
var $q = require('q');

function createResponseObject(err, data){
    var responseObj = {
        error: false
    };
    if(err){
        responseObj.error = new errors.ErrorMessage(errors.errorTypes.UNHANDLED_ERROR)
            .appendMessages(JSON.stringify(err))
            .generate();
    }
    else{
        responseObj.data = data;
    }
    return responseObj;
}

function getProjectConfiguration(req) {
    var config = req.body;
    var deferred =  $q.defer();
    if(!config.data || !config.data.projectId || !config.data.ruleId){
        var errorMessage = new errors.ErrorMessage(errors.errorTypes.MANDATORY_FIELDS_MISSING)
            .appendMessages('ProjectId or RuleId is missing')
            .generate();
        deferred.reject({error: errorMessage});
        return deferred.promise;
    }
    var isMinimal = config.data.isMinimalConfig;
    var str = config.data.projectId + '_' + config.data.ruleId;
    GLOBAL.configurations[str] = {};
    restAPIService.getProjectConfiguration(config.data).then(function (response) {
        GLOBAL.configurations[str] = response;
        if(isMinimal) {
            var temp = {};
            temp.pages = response.pages;
            temp.nav = response.nav;
            temp.gateways = response.gateways;
            temp.footer = response.footer;
            deferred.resolve(createResponseObject(null, temp));
        }
        else {
            deferred.resolve(createResponseObject(null, response));
        }
    }).fail(function (err) {
        deferred.reject(createResponseObject(err));
    });
    return deferred.promise;
}

function getData(req) {
    var deferred =  $q.defer();
    var config = req.body;
    restAPIService.getData(config).then(function (response) {
        deferred.resolve(createResponseObject(null, response));
    }).fail(function (err) {
        deferred.reject(createResponseObject(err));
    });
    return deferred.promise;
}

function setData(req) {
    var config = req.body;
    var deferred =  $q.defer();
    restAPIService.setData(config).then(function (response) {
        deferred.resolve(createResponseObject(null, response));
    }).fail(function (err) {
        deferred.reject(createResponseObject(err));
    });
    return deferred.promise;
}

function deleteData(req) {
    var config = req.body;
    var deferred =  $q.defer();
    restAPIService.deleteData(config).then(function (response) {
        deferred.resolve(createResponseObject(null, response));
    }).fail(function (err) {
        deferred.reject(createResponseObject(err));
    });
    return deferred.promise;
}

function setDataFromForm(req) {
    var deferred =  $q.defer();
    restAPIService.setDataFromForm(req).then(function (response) {
        deferred.resolve(createResponseObject(null, response));
    }).fail(function (err) {
        deferred.reject(createResponseObject(err));
    });
    return deferred.promise;
}

function getBandData(req) {
    var config = req.body;
    var deferred =  $q.defer();
    if(!config.data){
        var errorMessage = new errors.ErrorMessage(errors.errorTypes.MANDATORY_FIELDS_MISSING)
            .appendMessages('Data key in req obj is missing')
            .generate();
        deferred.reject({error: errorMessage});
        return deferred.promise;
    }
    restAPIService.getBandData(config.data).then(function (response) {
        deferred.resolve(createResponseObject(null, response));
    }).fail(function (err) {
        deferred.reject(createResponseObject(err));
    });   
    return deferred.promise;
}

function getFormData(req) {
    var config = req.body;
    var deferred =  $q.defer();
    if(!config.data){
        var errorMessage = new errors.ErrorMessage(errors.errorTypes.MANDATORY_FIELDS_MISSING)
            .appendMessages('Data key in req obj is missing')
            .generate();
        deferred.reject({error: errorMessage});
        return deferred.promise;
    }
    restAPIService.getFormData(config.data).then(function (response) {
        deferred.resolve(createResponseObject(null, response));
    }).fail(function (err) {
        deferred.reject(createResponseObject(err));
    });   
    return deferred.promise;
}

function getCRUDData(req) {
    var config = req.body;
    var deferred =  $q.defer();
    if(!config.data){
        var errorMessage = new errors.ErrorMessage(errors.errorTypes.MANDATORY_FIELDS_MISSING)
            .appendMessages('Data key in req obj is missing')
            .generate();
        deferred.reject({error: errorMessage});
        return deferred.promise;
    }
    restAPIService.getCRUDData(config.data).then(function (response) {
        deferred.resolve(createResponseObject(null, response));
    }).fail(function (err) {
        deferred.reject(createResponseObject(err));
    });
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
    getCRUDData: getCRUDData,

    createResponseObject: createResponseObject
};