/**
 * Created by Jithu.jose on 3/7/2016.
 */
'use strict';
var path = require('path');
var async = require('async');
var config = require(path.resolve('backend/config'));
var bandService = require(path.resolve('backend/services/bandService'));
var $q = require('q');

function getSingleBandDataWithConfig(data){
    var deferred = $q.defer();
    async.waterfall([
        function(callback){
            bandService.getSingleBandConfig(data.id, function(err, band){
                callback(err, band)
            });
        },
        function(band, callback){
            var responseArr = [];
            responseArr.push(band);
            bandService.getSingleBandAssets(band, function(err, assetsConfig){
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