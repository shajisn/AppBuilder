/**
 * Created by Jithu.jose on 2/2/2016.
 */

var path = require('path');
var projectDB = require(path.resolve('backend/database/projectDB'));
var $q = require('q');

function saveApplication(config) {
    var deferred =  $q.defer();
    projectDB.saveApplication(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function updateApplication(config) {
    var deferred =  $q.defer();
    projectDB.updateApplication(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteApplication(config) {
    var deferred =  $q.defer();
    projectDB.deleteApplication(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

module.exports = {
    saveApplication: saveApplication,
    updateApplication: updateApplication,
    deleteApplication: deleteApplication
};