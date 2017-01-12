/**
 * Created by Jithu.jose on 1/29/2016.
 */
var mongoose = require('mongoose');
var path = require('path');
var crudSchema = require(path.resolve('backend/database/crudSchema'));
var CRUDModal = mongoose.model('CRUD', crudSchema);

module.exports = CRUDModal;
