/**
 * Created by Jithu.jose on 3/7/2016.
 */
var path = require('path');
var restClient = require(path.resolve('backend/commons/restClient'));
var config = require(path.resolve('backend/config'));
var $q = require('q');

function getSingleBandConfig(bandId, callback){
    var url = config.mediaManagerUrl + '/api/public/execute';
    var data = {
        bandId: bandId,
        command: 'getBandData',
        projectId: config.projectId,
        ruleId: config.ruleId
    };
    restClient.post(url, data).then(function(response){
        callback(null, response.body[0]);                
    }).fail(function(err){
        callback(err);
    });  
}

function getSingleBandAssets(band, callback){
    var url = config.mediaManagerUrl + '/api/public/execute';
    var data = {
        templateId: band.template_id,
        searchSet: {
            'page_number': 0,
            'page_size': band.count,
            'search_query': band.data,
            'sort_by': band.sort
        },
        command: 'getDataFromOvp'
    };
    restClient.post(url, data).then(function(response){
        callback(null, response.body);
    }).fail(function(err){
        callback(err);
    });
}

module.exports = {
    getSingleBandAssets: getSingleBandAssets,
    getSingleBandConfig: getSingleBandConfig
};





