/**
 * Created by Jithu.jose on 2/1/2016.
 */

var api = require('express').Router();
var endpoint = '/api/profile';
var path = require('path');
var profileManager = require(path.resolve('backend/managers/profileManager'));

api.post('/getAllProfilesForSingleProject', function(req, res){
    profileManager.getAllProfilesForSingleProject(req.body.projectId).then(function(profiles){
        res.send(profiles);
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/save', function(req, res){
    profileManager.saveProfile(req.body).then(function(profile){
        res.send({data: profile});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/update', function(req, res){
    profileManager.updateProfile(req.body).then(function(profile){
        res.send({data: profile});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/delete', function(req, res){
    profileManager.deleteProfile(req.body).then(function(profile){
        res.send({data: profile});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/getSingleProfile', function(req, res){
    profileManager.getSingleProfile(req.body).then(function(profile){
        res.send(profile);
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/addValueToComplexField', function(req, res){
    profileManager.addValueToComplexField(req.body).then(function(valueObj){
        res.send({data: valueObj});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/deleteValueFromComplexField', function(req, res){
    profileManager.deleteValueFromComplexField(req.body).then(function(valueObj){
        res.send({data: valueObj});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/saveFieldValue', function(req, res){
    profileManager.saveFieldValue(req.body).then(function(responseObj){
        res.send({data: responseObj});
    }).fail(function(err){
        res.send(err);
    });
});

module.exports = {
    endpoint: endpoint,
    router: api
}
