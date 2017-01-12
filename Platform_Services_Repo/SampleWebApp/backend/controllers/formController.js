/**
 * Created by Krishnendu on 4/1/2016.
 */


// <BEGIN FILE DESCRIPTION>
//  {
//    "description" : "/api/auth/"
//  }
// <END FILE DESCRIPTION>
'use strict';

var path = require('path');
var api = require('express').Router();
var $q= require('q');
var formManager = require(path.resolve('backend/managers/formManager'));
var endpoint = '/api/auth';
api.post('/getSingleFormDataWithConfig', function(req, res) {
    formManager.getSingleFormDataWithConfig(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/setFormData', function(req, res) {
    formManager.setFormData(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});


module.exports = {
    router: api,
    endpoint: endpoint
};