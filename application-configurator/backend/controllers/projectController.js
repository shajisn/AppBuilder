/**
 * Created by Jithu.jose on 1/29/2016.
 */
var api = require('express').Router();
var endpoint = '/api/project';
var path = require('path');
var projectManager = require(path.resolve('backend/managers/projectManager'));

api.post('/save', function(req, res){
    projectManager.saveProject(req.body).then(function(project){
        res.send({data: project});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/update', function(req, res){
    projectManager.updateProject(req.body).then(function(project){
        res.send({data: project});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/delete', function(req, res){
    projectManager.deleteProject(req.body).then(function(project){
        res.send(project);
    }).fail(function(err){
        res.send(err);
    });
});

api.get('/getAllProjects', function(req, res){
    projectManager.getAllProjects().then(function(projects){
        res.send(projects);
    }).fail(function(err){
        res.send(err);
    });
});
api.post('/getSingleProject', function(req, res){
    projectManager.getSingleProject(req.body.projectId).then(function(project){
        res.send(project);
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/changeProfileIdInGlobalConfig', function(req, res){
    projectManager.changeProfileIdInGlobalConfig(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});


module.exports = {
    endpoint: endpoint,
    router: api
}
