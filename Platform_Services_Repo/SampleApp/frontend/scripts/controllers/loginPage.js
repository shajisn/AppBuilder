/**
 * Created by Krishnendu on 4/1/2016.
 */

angular.module('mediaApp')
    .controller('LoginPageCtrl', [
        '$q',
        '$scope',
        'configuration',
        'UserManager',
        function($q, $scope, configuration, UserManager){
            // $scope.loading = true;
            // $scope.configuration = configuration;
            $scope.credentials = {};

            $scope.signup = function (credentials) {
                console.log(credentials);
                UserManager.signup(credentials).then(function (result) {
                    console.log(result);
                });
            };

            function populateForm() {
                var formPromiseArr = [];
                configuration.forms.forEach(function(form){
                    formPromiseArr.push(UserManager.getSingleFormDataWithConfig(form.id));
                });
                $q.all(formPromiseArr).then(function(responseArr){
                    populateAllFormsDone(responseArr);
                }, function(err){
                    console.error('Error in getting form details: ', err);
                });
            }

            function populateAllFormsDone(formResponseArr){
                $scope.forms = formResponseArr;
                $scope.fields = formResponseArr[0].fields;
                console.log('********', $scope.forms[0]);
                // $scope.loading = false;
            }

            populateForm();
        }
    ]);