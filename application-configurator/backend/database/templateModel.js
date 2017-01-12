/**
 * Created by Jithu.jose on 2/25/2016.
 */
var mongoose = require('mongoose');
var path = require('path');

var templateSchema = require(path.resolve('backend/database/templateSchema'));
var TemplateModal = mongoose.model('Templates', templateSchema);

module.exports = TemplateModal;