/**
 * Created by Jithu.jose on 2/1/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var profileSchema = new Schema({
    id: {type: String, required: true, unique:true},
    name: {type: String, required: true, unique: true},
    description: {type: String},
    projectId: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    configuration: {}
});

module.exports = profileSchema;
