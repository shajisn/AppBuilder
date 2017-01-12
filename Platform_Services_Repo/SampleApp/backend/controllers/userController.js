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
var userManager = require(path.resolve('backend/managers/userManager'));
var endpoint = '/api/auth';
api.post('/getSingleFormDataWithConfig', function(req, res) {
    userManager.getSingleFormDataWithConfig(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/signup', function(req, res) {
    userManager.signup(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});


module.exports = {
    router: api,
    endpoint: endpoint
};