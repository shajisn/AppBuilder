/**
 * Created by Jithu.jose on 2/1/2016.
 */

var app = require('../../../server');
var request = require('supertest');

describe('GET /api/projects/getAllProjects', function(){

    it('should respond with array of projects', function(done){
        request(app)
            .get('/api/projects/getAllProjects')
            .expect(200)
            .end(function(err, res){
                if(err){
                    return done(err);
                }
                res.body.should.be.instanceof(Object);
                done();
            });
    });
});


describe('POST /api/projects/save', function(){

    var project = {
        projectName: 'testProject',
        description: 'testDesc'
    }

    it('should save new project created', function(done){
        request(app)
            .post('/api/projects/save')
            .expect(200)
            .set('Accept', 'application/json')
            .send(project)
            .expect('Content-Type', /json/)
            .end(function(err, res){
                if(err){
                    return done(err);
                }
                res.body.should.be.instanceof(Object);
                res.body.should.have.property('projectId');
                res.body.should.have.property('_id');
                res.body.should.have.property('projectName');
                done();
            });
    });
});