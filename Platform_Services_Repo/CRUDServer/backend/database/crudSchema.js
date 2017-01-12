/**
 * Created by Jithu.jose on 1/29/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crudSchema = new Schema({
    id: {type: String, required: true, unique:true},
    name: {type: String, required: true, unique: true},
    address: {type: String},
    dateOfBirth: {type: Date},
    mobile: {type: String},
    sex: {type: String},
    image: {type: String}
});

module.exports = crudSchema;

