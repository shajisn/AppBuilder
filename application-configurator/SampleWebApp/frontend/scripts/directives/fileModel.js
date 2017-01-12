/**
 * Created by Jithu.jose on 6/13/2016.
 */
/**
 * Created by Jithu.jose on 5/27/2016.
 */
mediaApp.directive('fileModel', [
        '$parse',
        function($parse){
            return{
                restrict: 'A',
                link: function(scope, element, attrs){
                    var onChange = $parse(attrs.fileModel);
                    element.on('change', function (event) {
                        onChange(scope, { $files: event.target.files });
                    });
                }
            }
        }
    ]);