/**
 * Created by Jithu.jose on 2/2/2016.
 */

var path = require('path');
var projectDB = require(path.resolve('backend/database/projectDB'));
var $q = require('q');

function saveRule(config) {
    var deferred =  $q.defer();
    projectDB.saveRule(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function updateRule(config) {
    var deferred =  $q.defer();
    projectDB.updateRule(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteRule(config) {
    var deferred =  $q.defer();
    projectDB.deleteRule(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

module.exports = {
    saveRule: saveRule,
    updateRule: updateRule,
    deleteRule: deleteRule
};