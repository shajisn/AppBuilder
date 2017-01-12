/**
 * Created by Jithu.jose on 2/25/2016.
 */

angular.module('mediaManager.states.templates', ['ui.router'])
    .config(['$stateProvider', function($stateProvider){
        function getAllTemplates(){
            return ['$q', 'TemplateManager',
                function($q, TemplateManager){
                    var deferred = $q.defer();
                    TemplateManager.getAllTemplates().then(function(templates){
                        deferred.resolve(templates);
                    }, function(err){
                        console.error('error in getting templates: ', err);
                        deferred.reject(err);
                    });
                    //deferred.resolve({test: 'test'});
                    return deferred.promise;
                }
            ];
        }

        function getSingleTemplate(){
            return ['$q', 'TemplateManager', '$stateParams',
                function($q, TemplateManager, $stateParams){
                    var deferred = $q.defer();
                    TemplateManager.getSingleTemplate(
                        $stateParams.templateId,
                        $stateParams.fieldId
                    ).then(function(template){
                        deferred.resolve(template);
                    }, function(err){
                        console.error('error in getting templates: ', err);
                        deferred.reject(err);
                    });
                    return deferred.promise;
                }
            ];
        }
        $stateProvider.state('templates', {
            url: '/templates',
            templateUrl: 'partials/templates',
            controller: 'TemplatesCtrl',
            resolve: {
                templates: getAllTemplates()
            }
        });
        $stateProvider.state('template', {
            url: '/templates/template/:templateId?fieldId',
            templateUrl: 'partials/templatePage',
            controller: 'TemplatePageCtrl',
            resolve: {
                template: getSingleTemplate()
            }
        });
    }]);
