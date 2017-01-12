/**
 * Created by Jithu.jose on 1/29/2016.
 */
var mongoose = require('mongoose');
var mongoUrl = 'mongodb://localhost/CRUD';
mongoose.connect(mongoUrl, function(err){
    if(err){
        console.log('Error in connecting to mongodb: ', err);
    }
    else{
        console.log('Connected to mongodb')
    }
});
