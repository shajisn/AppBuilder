/**
 * Created by Jithu.jose on 3/7/2016.
 */
/**
 * Created by Jithu.jose on 1/28/2016.
 */
'use strict';

angular.module('mediaApp.states.homePage', ['ui.router'])
    .config(['$stateProvider', function($stateProvider){
        function getHomePageConfiguration(){
            return ['$q', 'ConfigurationManager', 'constants',
                function($q, ConfigurationManager, constants){
                    var deferred = $q.defer();
                    ConfigurationManager.getPageConfiguration(
                        constants.PAGE_IDs.HOME
                    ).then(function(configuration){
                        deferred.resolve(configuration);
                    }, function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                }
            ];
        }

        function getSignupPageConfiguration(){
            return ['$q', 'ConfigurationManager', 'constants',
                function($q, ConfigurationManager, constants){
                    var deferred = $q.defer();
                    ConfigurationManager.getPageConfiguration(
                        constants.PAGE_IDs.SIGNUP
                    ).then(function(configuration){
                        deferred.resolve(configuration);
                    }, function(err){
                        deferred.reject(err);
                    });
                    return deferred.promise;
                }
            ];
        }

        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'partials/homePage',
            controller: 'HomePageCtrl',
            resolve: {
                configuration: getHomePageConfiguration()
            }
        });

        $stateProvider.state('signup', {
            url: '/signup',
            templateUrl: 'partials/loginPage',
            controller: 'LoginPageCtrl',
            resolve: {
                configuration: getSignupPageConfiguration()
            }
        });
    }]);
