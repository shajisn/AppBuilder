/**
 * Created by Jithu.jose on 1/29/2016.
 */
var mongoose = require('mongoose');
var path = require('path');

var projectSchema = require(path.resolve('backend/database/projectSchema'));
var ProjectModal = mongoose.model('Projects', projectSchema);

module.exports = ProjectModal;
