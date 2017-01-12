/**
 * Created by Jithu.jose on 3/2/2016.
 */

var api = require('express').Router();
var endpoint = '/api/public';
var path = require('path');
var restAPIManager = require(path.resolve('backend/managers/restAPIManager'));

api.post('/execute', function(req, res){
    var command = 'setDataFromForm';
    if(req.body.command){
       command = req.body.command;
    }
    if(typeof restAPIManager[command] !== 'function'){
        res.send(restAPIManager.createResponseObject('Invalid command pattern'));
        return;
    }
    restAPIManager[command](req).then(function(configuration){
        res.send(configuration);
    }).fail(function(err){
        res.send(err);
    });
});

module.exports = {
    endpoint: endpoint,
    router: api
};

