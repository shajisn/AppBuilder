/**
 * Created by Jithu.jose on 2/1/2016.
 */
var mongoose = require('mongoose');
var path = require('path');

var profileSchema = require(path.resolve('backend/database/profileSchema'));
var ProfileModal = mongoose.model('Profiles', profileSchema);

module.exports = ProfileModal;