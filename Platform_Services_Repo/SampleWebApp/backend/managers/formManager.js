/**
 * Created by Krishnendu on 4/1/2016.
 */
'use strict';
var path = require('path');
var async = require('async');
var config = require(path.resolve('backend/config'));
var formService = require(path.resolve('backend/services/formService'));
var $q = require('q');

function getSingleFormDataWithConfig(data){
    var deferred = $q.defer();
    formService.getSingleFormDataWithConfig(data.id).then(function(result) {

        deferred.resolve(result);
    });
    return deferred.promise;
}

function setFormData(data){
    var deferred = $q.defer();
    formService.setFormData(data).then(function(result) {
        deferred.resolve(result);
    });
    return deferred.promise;
}

module.exports = {
    getSingleFormDataWithConfig: getSingleFormDataWithConfig,
    setFormData: setFormData
};