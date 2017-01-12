/**
 * Created by Jithu.jose on 1/29/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
    id: {type: String, required: true, unique:true},
    name: {type: String, required: true, unique: true},
    description: {type: String},
    applications: {type: Array},
    globalConfiguration: {type: 'mixed'},
    rules: {type: Array},
    sections: {type: Array},
    fields: {type: Array},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = projectSchema;
