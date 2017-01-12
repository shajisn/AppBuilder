/**
 * Created by Krishnendu on 4/1/2016.
 */
'use strict';
var path = require('path');
var async = require('async');
var config = require(path.resolve('backend/config'));
var userService = require(path.resolve('backend/services/userService'));
var $q = require('q');

function getSingleFormDataWithConfig(data){
    var deferred = $q.defer();
    userService.getSingleFormDataWithConfig(data.id).then(function(result) {
        deferred.resolve(result);
    });
    return deferred.promise;
}

function signup(data){
    var deferred = $q.defer();
    userService.signup(data).then(function(result) {
        deferred.resolve(result);
    });
    return deferred.promise;
}

module.exports = {
    getSingleFormDataWithConfig: getSingleFormDataWithConfig,
    signup: signup
};