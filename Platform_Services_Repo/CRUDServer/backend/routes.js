/**
 * Created by Jithu.jose on 1/28/2016.
 */
var path = require('path');

var config = require(path.resolve('backend/config'));
var CRUDService = require(path.resolve('backend/services/crudService'));
var crudService = new CRUDService();


module.exports = function(app){

    app.get('/api/user/getData', function(req, res){
        crudService.getData(function(err, data){
             if(err){
                 res.statusCode = 500;
             }
            res.send(data);
        });
    });

    app.post('/api/user/setData', function(req, res){
        crudService.setData(req, function(err, data){
            if(err){
                res.statusCode = 500;
            }
            res.send(data);
        });

    });

    app.put('/api/user/updateData', function(req, res){
        crudService.updateData(req, function(err, data){
            if(err){
                res.statusCode = 500;
            }
            res.send(data);
        });
    });

    app.delete('/api/user/deleteData', function(req, res){
        crudService.deleteData(req.body, function(err, data){
            if(err){
                res.statusCode = 500;
            }
            res.send(data);
        });
    });

    app.get('/', function(req, res){
       res.sendFile(config.root + '/frontend/index.html')
    });
};
