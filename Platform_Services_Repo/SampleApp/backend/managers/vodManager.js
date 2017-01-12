/**
 * Created by Jithu.jose on 3/7/2016.
 */
'use strict';
var path = require('path');
var async = require('async');
var config = require(path.resolve('backend/config'));
var vodService = require(path.resolve('backend/services/vodService'));
var $q = require('q');

function getSingleBandDataWithConfig(data){
    var deferred = $q.defer();
    async.waterfall([
        function(callback){
            vodService.getSingleBandConfig(data.id, function(err, band){
                callback(err, band)
            });
        },
        function(band, callback){
            var responseArr = [];
            responseArr.push(band);
            vodService.getSingleBandAssets(band, function(err, assetsConfig){
                responseArr.push(assetsConfig);
                callback(err, responseArr);
            });
        }
    ], function(err, result){
        if(err){
            deferred.reject(err);
        }
        else{
            var responseObject = {
                config: result[0],
                data: result[1]
            };
            deferred.resolve(responseObject);
        }
    });

    return deferred.promise;
}

module.exports = {
    getSingleBandDataWithConfig: getSingleBandDataWithConfig
};