/**
 * Created by Jithu.jose on 3/7/2016.
 */

angular.module('mediaApp')
    .provider('constants', function() {
        var values = {
            PAGE_IDs: {
                HOME: 'home',
                SIGNUP: 'signup'
            },
            projectId: '02090433244256412110',
            ruleId: '71552511581262141201',
            navbar_config_key: 'nav'
        };
        return {
            set: function(constants){
                angular.extend(values, constants);
            },
            $get: function(){
                return values;
            }
        }
    });