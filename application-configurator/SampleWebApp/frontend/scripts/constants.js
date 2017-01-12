/**
 * Created by Jithu.jose on 3/7/2016.
 */

angular.module('mediaApp')
    .provider('constants', function() {
        var values = {
            projectId: '02090433244256412110',
            ruleId: '71552511581262141201',
            navbar_config_key: 'nav',
            middlewareURL: 'http://192.168.3.124:9400'
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