/**
 * Created by Jithu.jose on 6/6/2016.
 */
/**
 * Created by Jithu.jose on 3/7/2016.
 */

angular.module('mediaApp.managers.crudManager', [])
    .factory('CRUDManager', [
        '$q',
        'CRUDService',
        'constants',
        function($q, CRUDService, constants){
            var factoryObj = {
                getSingleCRUDData: function(crudId){
                    var deferred = $q.defer();
                    var config = {
                        command: 'getCRUDData',
                        data: {
                            projectId: constants.projectId,
                            ruleId: constants.ruleId,
                            crudId: crudId
                        }
                    };
                    CRUDService.getSingleCRUDData(config).then(function(response){
                        deferred.resolve(response);
                    }, function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },

                getSingleCRUDContent: function(crud){
                    var deferred = $q.defer();
                    var config = {
                        command: 'getData',
                        templateId: crud.template_id
                    };
                    CRUDService.getSingleCRUDContent(config).then(function(response){
                        deferred.resolve(response);
                    }, function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },
                deleteData: function(data, templateId){
                    var deferred = $q.defer();
                    var config = {
                        command: 'deleteData',
                        templateId: templateId,
                        data: data
                    };
                    CRUDService.deleteData(config).then(function(response){
                        deferred.resolve(response);
                    }, function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                }
            };
            return factoryObj;
        }
    ]);

