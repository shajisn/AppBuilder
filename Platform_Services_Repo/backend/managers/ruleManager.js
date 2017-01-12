/**
 * Created by Jithu.jose on 2/2/2016.
 */

var path = require('path');
var ruleService = require(path.resolve('backend/services/ruleService'));
var $q = require('q');

function saveRule(config) {
    var deferred =  $q.defer();
    ruleService.saveRule(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function updateRule(config) {
    var deferred =  $q.defer();
    ruleService.updateRule(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteRule(config) {
    var deferred =  $q.defer();
    ruleService.deleteRule(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function getAllRulesForSingleProject(projectId) {
    var deferred =  $q.defer();
    ruleService.getAllRulesForSingleProject(projectId).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

module.exports = {
    saveRule: saveRule,
    updateRule: updateRule,
    deleteRule: deleteRule,

    getAllRulesForSingleProject: getAllRulesForSingleProject
};