/**
 * Created by Jithu.jose on 3/2/2016.
 */
var $q = require('q');
var fs = require('fs');
var request = require('request');

function wrapRequest(deferred, options){
    request(options, function(err, response, body){
        if(err || (response.statusCode < 200 || response.statusCode >=400)){
            console.log('Error in geting data',  err);
            deferred.reject(err);
        }
        else{
            deferred.resolve({response: response.body || body});
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
        json: true,
        body:body,
        method: 'POST'
    };
    wrapRequest(deferred, options);
    return deferred.promise;
}

function deleteReq(url, body){
    var deferred = $q.defer();
    var options = {
        url: url,
        json: true,
        body:body,
        method: 'DELETE'
    };
    wrapRequest(deferred, options);
    return deferred.promise;
}

function postFormData(url, data, options){
    var deferred = $q.defer();
    var req = request[options.method](url, function (err, response, body) {
        if(err || (response.statusCode < 200 || response.statusCode >=400)){
            console.log('Error in geting data',  err || body);
            deferred.reject(err || body);
        }
        else{
            deferred.resolve({response: response, body: body});
        }
    });
    var form = req.form();
    //form.append(options.fileKey, fs.createReadStream(options.filePath));
    if(options.filePath){
        form.append(options.fileKey, fs.createReadStream(options.filePath), {
            filename: options.fileName,
            contentType: 'text/plain'
        });
    }
    if(data){
        form.append(options.fieldWrapperKey, JSON.stringify(data));
    }
    return deferred.promise;
}

module.exports = {
    get: get,
    deleteReq: deleteReq,
    post: post,
    postFormData: postFormData
};
