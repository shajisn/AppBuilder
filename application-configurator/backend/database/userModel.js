/**
 * Created by Jithu.jose on 1/29/2016.
 */
var mongoose = require('mongoose');
var path = require('path');
var userSchema = require(path.resolve('backend/database/userSchema'));
var UserModal = mongoose.model('Users', userSchema);

module.exports = UserModal;
