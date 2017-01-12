/**
 * Created by Jithu.jose on 2/2/2016.
 */

var api = require('express').Router();
var endpoint = '/api/applications';
var path = require('path');
var applicationManager = require(path.resolve('backend/managers/applicationManager'));

api.post('/save', function(req, res){
    applicationManager.saveApplication(req.body).then(function(application){
        res.send({data: application});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/update', function(req, res){
    applicationManager.updateApplication(req.body).then(function(application){
        res.send({data: application});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/delete', function(req, res){
    applicationManager.deleteApplication(req.body).then(function(application){
        res.send({data: application});
    }).fail(function(err){
        res.send(err);
    });
});

module.exports = {
    endpoint: endpoint,
    router: api
};
