/**
 * Created by Jithu.jose on 2/25/2016.
 */

var api = require('express').Router();
var endpoint = '/api/templates';
var path = require('path');
var templateManager = require(path.resolve('backend/managers/templateManager'));

api.get('/getAllTemplates', function(req, res){
    templateManager.getAllTemplates(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/getSingleTemplate', function(req, res){
    templateManager.getSingleTemplate(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/save', function(req, res){
    templateManager.saveTemplate(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/update', function(req, res){
    templateManager.updateTemplate(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/delete', function(req, res){
    templateManager.deleteTemplate(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/saveField', function(req, res){
    templateManager.saveField(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/updateField', function(req, res){
    templateManager.updateField(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/deleteField', function(req, res){
    templateManager.deleteField(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/generateTemplateConfiguration', function(req, res){
    templateManager.generateTemplateConfiguration(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});

module.exports = {
    endpoint: endpoint,
    router: api
};