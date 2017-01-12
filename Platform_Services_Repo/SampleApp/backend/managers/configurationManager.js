/**
 * Created by Jithu.jose on 3/7/2016.
 */
var path = require('path');
var configurationService = require(path.resolve('backend/services/configurationService'));
var config = require(path.resolve('backend/config'));
var $q = require('q');

function getProjectConfiguration(data){
    var deferred = $q.defer();
    configurationService.getProjectConfiguration(data).then(function(projectConfiguration){
        config.projectConfiguration = projectConfiguration;
        deferred.resolve({message: 'configuration saved successfully'});
    }).fail(function(err){
        deferred.reject(err);
    });
    return deferred.promise;
}

function getPageConfiguration(pageConfig, callback){
    configurationService.getPageConfiguration(pageConfig, function(err, pageConfiguration){
        callback(err, pageConfiguration);
    });
}

function getConfig(config, callback){
    configurationService.getConfig(config.key, function(err, config){
        callback(err, config);
    });
}

module.exports = {
    getProjectConfiguration: getProjectConfiguration,
    getPageConfiguration: getPageConfiguration,
    getConfig: getConfig
};