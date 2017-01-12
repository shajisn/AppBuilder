/**
 * Created by Jithu.jose on 2/8/2016.
 */
var api = require('express').Router();
var endpoint = '/api/configuration';
var path = require('path');
var configurationManager = require(path.resolve('backend/managers/configurationManager'));

api.post('/getProjectConfiguration', function(req, res){
    configurationManager.getProjectConfiguration(req.body).then(function(response){
        res.send({data: response});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/saveSection', function(req, res){
    configurationManager.saveSection(req.body).then(function(response){
        res.send({data: response});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/updateSection', function(req, res){
    configurationManager.updateSection(req.body).then(function(section){
        res.send({data: section});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/deleteSection', function(req, res){
    configurationManager.deleteSection(req.body).then(function(section){
        res.send({data: section});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/saveField', function(req, res){
    configurationManager.saveField(req.body).then(function(field){
        res.send({data: field});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/updateField', function(req, res){
    configurationManager.updateField(req.body).then(function(field){
        res.send({data: field});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/deleteField', function(req, res){
    configurationManager.deleteField(req.body).then(function(field){
        res.send({data: field});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/getSingleFieldForProject', function(req, res){
    configurationManager.getSingleFieldForProject(req.body).then(function(field){
        res.send({data: field});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/saveAttribute', function(req, res){
    configurationManager.saveAttribute(req.body).then(function(field){
        res.send({data: field});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/updateAttribute', function(req, res){
    configurationManager.updateAttribute(req.body).then(function(field){
        res.send({data: field});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/deleteAttribute', function(req, res){
    configurationManager.deleteAttribute(req.body).then(function(field){
        res.send({data: field});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/updateParameter', function(req, res){
    configurationManager.updateParameter(req.body).then(function(parameter){
        res.send({data: parameter});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/generateProfileConfiguration', function(req, res){
    configurationManager.generateProfileConfiguration(req.body).then(function(parameter){
        res.send({data: parameter});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/saveDynamicOptionToListField', function(req, res){
    configurationManager.saveDynamicOptionToListField(req.body).then(function(parameter){
        res.send({data: parameter});
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/deleteDynamicOptionFromListField', function(req, res){
    configurationManager.deleteDynamicOptionFromListField(req.body).then(function(parameter){
        res.send({data: parameter});
    }).fail(function(err){
        res.send(err);
    });
});

module.exports = {
    endpoint: endpoint,
    router: api
};