/**
 * Created by Jithu.jose on 2/25/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var templateSchema = new Schema({
    id: {type: String, required: true, unique:true},
    name: {type: String, required: true, unique: true},
    ovp: {type: String},
    description: {type: String},
    configuration: {type: 'mixed'},
    fields: {type: 'mixed'},
    action: {type: 'mixed'},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = templateSchema;
