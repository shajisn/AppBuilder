/**
 * Created by Jithu.jose on 5/31/2016.
 */
var path = require('path');
var formidable = require('formidable');
var async = require('async');
var rs = require('random-strings');
var fs = require('fs');
var config = require(path.resolve('backend/config'));

var CRUDDB = require(path.resolve('backend/database/crudDB'));
var crudDb = new CRUDDB();
function CRUDService(){
    var self = this;
    return self;
}

CRUDService.prototype = {
    setData: function(req, callback){
        var self = this;
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
            fields.userData = JSON.parse(fields.userData);
            fields.userData.id = rs.numeric(20);

            var currentPath = files.image.path,
                fileSize = files.image.size,
                file_ext = files.image.name.split('.').pop(),
                index = currentPath.lastIndexOf('/') + 1,
                fileName = currentPath.substr(index),
                newPath = config.root + '/frontend/images/' + fields.userData.id + '.' + file_ext;

            fields.userData.image = req.protocol + '://' + req.headers.host + '/images/' + fields.userData.id + '.' + file_ext;

            async.parallel([
                function(asyncCallback){
                    async.series([
                        function(innerAsyncCallback){
                            fs.readFile(currentPath, function(err, data){
                                fs.writeFile(newPath, data, function(err){
                                    innerAsyncCallback(err);
                                });
                            });
                        },
                        function(innerAsyncCallback){
                            fs.unlink(currentPath, function(err){
                                innerAsyncCallback(err);
                            });
                        }
                    ], function(err){
                        asyncCallback(err);
                    });
                },
                function(asyncCallback){
                    crudDb.setData(fields.userData, function(err, crudDB){
                        asyncCallback(err, crudDB);
                    });
                }
            ], function(err, result){
                callback(err, self.createResponseMsg(err));
                if(err){
                    result[1].remove(function(err){
                        if(err){
                            console.log('Error in removing row from collection: ', err);
                        }
                    });
                }
            });
        });
        return self;
    },
    getData: function(callback){
        var self = this;

        crudDb.getData(function(err, data){
            callback(err, self.createResponseMsg(err, data));
        });
        return self;
    },
    updateData: function(req, callback){
        var self = this;
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
            fields.userData = JSON.parse(fields.userData);
            if(Object.keys(files).length){
                var currentPath = files.image.path,
                    fileSize = files.image.size,
                    file_ext = files.image.name.split('.').pop(),
                    index = currentPath.lastIndexOf('/') + 1,
                    fileName = currentPath.substr(index),
                    newPath = config.root + '/frontend/images/' + fields.userData.id + '.' + file_ext;
                fields.userData.image = req.protocol + '://' + req.headers.host + '/images/' + fields.userData.id + '.' + file_ext;
            }
            async.parallel([
                function(asyncCallback){
                    async.series([
                        function(innerAsyncCallback){
                            if(!Object.keys(files).length){
                                innerAsyncCallback(null);
                                return
                            }
                            fs.readFile(currentPath, function(err, data){
                                fs.writeFile(newPath, data, function(err){
                                    innerAsyncCallback(err);
                                });
                            });
                        },
                        function(innerAsyncCallback){
                            if(!Object.keys(files).length){
                                innerAsyncCallback(null);
                                return
                            }
                            fs.unlink(currentPath, function(err){
                                innerAsyncCallback(err);
                            });
                        }
                    ], function(err){
                        asyncCallback(err);
                    });
                },
                function(asyncCallback){
                    crudDb.updateData(fields.userData, function(err){
                        asyncCallback(err);
                    });
                }
            ], function(err){
                callback(err, self.createResponseMsg(err));
            });
        });

        return self;
    },
    deleteData: function(data, callback){
        var self = this;
        crudDb.deleteData(data, function(err){
            callback(self.createResponseMsg(err));
            fs.readdir(config.root + '/frontend/images/', function(err, fileNames){
                if(!err){
                    fileNames.forEach(function(file){
                        if(file.indexOf(data.id) !== -1){
                            fs.unlink(config.root + '/frontend/images/' + file);
                        }
                    });
                    return;
                }
                console.log('Error in reading file directory', err);
            })
        });
        return self;
    },
    createResponseMsg: function(err, data){
        var response = {};
        if(err){
            response.error = true;
            response.errorMessage = err;
            return response;
        }
        response.error = false;
        response.userData = data;
        return response;
    }
};

module.exports = CRUDService;