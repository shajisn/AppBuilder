/**
 * Created by Jithu.jose on 3/2/2016.
 */

var assert = require('assert');

var errorCodes = {
};

function ErrorMessage(name, defaultMessage){
    assert.ok(typeof(name) === 'string', 'name must be string');
    this.messages = [];
    this.response = {
        name: name,
        message: defaultMessage
    };
}
ErrorMessage.prototype.appendMessages = function(message){
    this.messages.push(message);
    return this;
};

ErrorMessage.prototype.generate = function(){
    if(this.messages.length){
        this.response.message = this.messages.join(',');
    }
    return this.response;
};

var errorTypes = {
    MANDATORY_FIELDS_MISSING: 'Missing mandatory fields',
    EMPTY_VALUES: 'Empty values',
    UNHANDLED_ERROR: 'unhandled error'
};

module.exports = {
    errorCodes: errorCodes,
    errorTypes: errorTypes,
    ErrorMessage: ErrorMessage
};
