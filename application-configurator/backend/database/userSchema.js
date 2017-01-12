/**
 * Created by Jithu.jose on 1/29/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
    userId: {type: String, required: true, unique:true},
    userName: {type: String, required: true, unique: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = projectSchema;

