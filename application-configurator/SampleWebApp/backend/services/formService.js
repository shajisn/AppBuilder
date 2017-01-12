/**
 * Created by Krishnendu on 4/1/2016.
 */
var path = require('path');
var restClient = require(path.resolve('backend/commons/restClient'));
var config = require(path.resolve('backend/config'));
var $q = require('q');

function getSingleFormDataWithConfig(formId){
	var deferred = $q.defer();
    var url = config.mediaManagerUrl + '/api/public/execute';
    var data = {
        command: 'getFormData',
        data: {
            formId: formId,
            projectId: config.projectId,
            ruleId: config.ruleId
        }
    };
    restClient.post(url, data).then(function(response){
        deferred.resolve(response.body.data[0]);
    }).fail(function(err){
    	deferred.reject(err);
    });
    return deferred.promise;
}

function setFormData(dataObj){
	var deferred = $q.defer();
    var url = config.mediaManagerUrl + '/api/public/execute';
    var data = {
        templateId: dataObj.templateId,
        data: dataObj.credentials,
        method: 'post',
        command: 'setData'
    };
    restClient.post(url, data).then(function(response){
        deferred.resolve(response.body);
    }).fail(function(err){
    	deferred.reject(err);
    });
    return deferred.promise;
}

module.exports = {
    getSingleFormDataWithConfig: getSingleFormDataWithConfig,
    setFormData: setFormData
};





