/**
 * Created by Jithu.jose on 1/28/2016.
 */
var path = require('path');
var config = require(path.resolve('backend/config'));
var fs = require('fs');

module.exports = function(app){

    fs.readdirSync('backend/controllers').filter(function(file) {
        return file.indexOf('Controller.js') !== -1;
    }).forEach(function (file) {
        var controller = require('./controllers/' + file);
        app.use(controller.endpoint, controller.router);
    });

    app.get('/partials/*', function(req, res){
        var stripped = req.url.split('.')[0];
        var requestedView = path.join('./', stripped);
        res.render(requestedView, function (err, html) {
            if (err) {
                res.status(404);
                res.send(404);
            } else {
                res.send(html);
            }
        });
    });

    app.get('/*', function(req, res){
        res.sendFile(path.join(config.root, 'frontend/index.html'));
    });
};
