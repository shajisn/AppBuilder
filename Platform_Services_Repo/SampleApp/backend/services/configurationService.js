/**
 * Created by Jithu.jose on 3/7/2016.
 */

var path = require('path');
var restClient = require(path.resolve('backend/commons/restClient'));
var config = require(path.resolve('backend/config'));
var $q = require('q');

function getProjectConfiguration(data){
    var deferred = $q.defer();
    var temp = {};
    temp.command = 'getProjectConfiguration';
    temp.data = data;
    temp.isMinimalConfig = true;
    temp.projectId = config.projectId;
    temp.ruleId = config.ruleId;

    var url = config.mediaManagerUrl + '/api/public/execute';
    restClient.post(url, temp).then(function(response){
        deferred.resolve(response.body);
    }).fail(function(err){
        deferred.reject(err);
    });
    return deferred.promise;
}
function getPageConfiguration(pageConfig, callback){
    try{
        var pageConfigArr = config.projectConfiguration.pages.filter(function(page){
            return page.id === pageConfig.id;
        });
        if(pageConfigArr.length){
            callback(null, pageConfigArr[0]);
        }
        else{
            callback('Invalid request parameters');
        }
    }
    catch (err){
        callback(err);
    }
}

function getConfig(key, callback){
    try{
        if(config.projectConfiguration[key]){
            callback(null, config.projectConfiguration[key]);
        }
        else{
            callback('Invalid Key');
        }
    }
    catch (err){
        callback(err);
    }
}

module.exports = {
    getProjectConfiguration: getProjectConfiguration,
    getPageConfiguration: getPageConfiguration,
    getConfig: getConfig
};