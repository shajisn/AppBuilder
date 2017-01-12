/**
 * Created by Jithu.jose on 5/31/2016.
 */

var path = require('path');
var CRUDModel = require(path.resolve('backend/database/crudModel'));

function crudDB(){
    var self = this;
    return self;
}

crudDB.prototype = {
    getData: function(callback){
        var self = this;
        CRUDModel.find({}, function(err, data){
           callback(err, data);
        });
        return self;
    },
    setData: function(data, callback){
        var self = this;
        var crudObj = {
            id: data.id,
            name: data.name,
            address: data.address,
            dateOfBirth: new Date(parseInt(data.dateOfBirth)),
            mobile: data.mobile,
            sex: data.sex,
            image: data.image
        };
        var crud = new CRUDModel(crudObj);
        crud.save(function(err){
            callback(err, crud);
        });
        return self;
    },
    updateData: function(data, callback){
        var self = this;
        CRUDModel.update({id: data.id}, {
            $set: {
                name: data.name,
                address: data.address,
                dateOfBirth: new Date(parseInt(data.dateOfBirth)),
                mobile: data.mobile,
                sex: data.sex,
                image: data.image
            }
        }, function(err){
            callback(err, data)
        });
        return self;
    },
    deleteData: function(data, callback){
        var self = this;
        CRUDModel.find({id: data.id}).remove(function(err){
            callback(err);
        });
        return self;
    }
};

module.exports = crudDB;