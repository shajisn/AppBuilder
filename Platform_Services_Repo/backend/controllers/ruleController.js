/**
 * Created by Jithu.jose on 2/2/2016.
 */

var api = require('express').Router();
var endpoint = '/api/rule';
var path = require('path');
var ruleManager = require(path.resolve('backend/managers/ruleManager'));

api.post('/save', function(req, res){
    ruleManager.saveRule(req.body).then(function(rule){
        res.send({data: rule});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/update', function(req, res){
    ruleManager.updateRule(req.body).then(function(rule){
        res.send({data: rule});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/delete', function(req, res){
    ruleManager.deleteRule(req.body).then(function(rule){
        res.send({data: rule});
    }).fail(function(err){
        res.send(err);
    });
});

module.exports = {
    endpoint: endpoint,
    router: api
}
