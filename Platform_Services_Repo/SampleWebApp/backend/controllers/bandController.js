/**
 * Created by Jithu.jose on 3/7/2016.
 */


// <BEGIN FILE DESCRIPTION>
//  {
//    "description" : "/api/vod/*  Used by frontend to log execution errors in AppGrid."
//  }
// <END FILE DESCRIPTION>
'use strict';

var path = require('path');
var api = require('express').Router();
var $q= require('q');
var bandManager = require(path.resolve('backend/managers/bandManager'));
var endpoint = '/api/band';
api.post('/getSingleBandDataWithConfig', function(req, res) {
    bandManager.getSingleBandDataWithConfig(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});


module.exports = {
    router: api,
    endpoint: endpoint
};