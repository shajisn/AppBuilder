/**
 * Created by Jithu.jose on 2/2/2016.
 */

var path = require('path');
var applicationService = require(path.resolve('backend/services/applicationService'));
var $q = require('q');

function saveApplication(config) {
    var deferred =  $q.defer();
    applicationService.saveApplication(config).then(function (response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function updateApplication(config) {
    var deferred =  $q.defer();
    applicationService.updateApplication(config).then(function(response) {
        deferred.resolve(response);
    }).fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function deleteApplication(config) {
    var deferred =  $q.defer();
    applicationService.deleteApplication(config).then(function(response) {
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