/**
 * Created by Jithu.jose on 1/29/2016.
 */
//var path = require('path');
module.exports = function(grunt){

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    grunt.loadNpmTasks('grunt-express-server');

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'frontend',
            dist: 'build'
        },
        less: {
            development: {
                options: {
                    paths: ['frontend/styles']
                },
                files: {
                    'frontend/styles/main.css': 'frontend/styles/less/*.less'
                }
            }
        },
        express: {
            options: {
                port: process.env.PORT || 9500
            },
            dev: {
                options: {
                    script: 'server.js',
                    keepalive: true,
                    serverreload: true
                }
            },
            prod: {
                options: {
                    script: 'dist/server.js',
                    node_env: 'production'
                }
            }
        },
        watch: {
            less: {
                // if any .less file changes in directory "public/css/" run the "less"-task.
                files: "frontend/styles/less/*.less",
                tasks: ["less"]
            },
            express: {
                files: [
                    'server.js',
                    'backend/**/*.{js,json}',
                    '!backend/**/*Test.js'
                ],
                tasks: ['express:dev'],
                options: {
                    livereload: 12345,
                    reload: true,
                    nospawn: false //Without this option specified express won't be reloaded
                }
            }
        }
    });



    grunt.registerTask('install', 'install the backend and frontend dependencies', function() {
        var async = require('async');
        var exec = require('child_process').exec;
        var done = this.async();

        var runCmd = function(item, callback) {
            process.stdout.write('running "' + item + '"...\n');
            var cmd = exec(item);
            cmd.stdout.on('data', function (data) {
                grunt.log.writeln(data);
            });
            cmd.stderr.on('data', function (data) {
                grunt.log.errorlns(data);
            });
            cmd.on('exit', function (code) {
                if (code !== 0) throw new Error(item + ' failed');
                grunt.log.writeln('done\n');
                callback();
            });
        };

        async.series({
                bower: function(callback){
                    runCmd('bower install', callback);
                }
            },
            function(err, results) {
                if (err) done(false);
                done();
            });
    });

    grunt.registerTask('compileLess', ['less']);

    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'install',
            'compileLess',
            'express:dev',
            'watch'
        ]);
    });

    grunt.registerTask('wait', function(){
        var done = this.async();
    });

};
