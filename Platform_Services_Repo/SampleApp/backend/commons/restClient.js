/**
 * Created by Jithu.jose on 3/7/2016.
 */


var $q = require('q');
var request = require('request');

function wrapRequest(deferred, options){
    request(options, function(err, response, body){
        if(err || (response.statusCode < 200 || response.statusCode >=400)){
            console.log('Error in geting data',  err);
        }
        else{
            deferred.resolve(response);
        }
    })
}

function get(url){
    var deferred = $q.defer();
    var options = {
        url: url,
        method: 'GET'
    };
    wrapRequest(deferred, options);
    return deferred.promise;
}

function post(url, body){
    var deferred = $q.defer();
    var options = {
        url: url,
        method: 'POST',
        body: body,
        json: true
    };
    wrapRequest(deferred, options);
    return deferred.promise;
}

module.exports = {
    get: get,
    post: post
};
