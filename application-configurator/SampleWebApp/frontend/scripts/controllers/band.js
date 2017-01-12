/**
 * Created by Jithu.jose on 3/7/2016.
 */

angular.module('mediaApp')
    .controller('bandCtrl', [
        '$q',
        '$scope',
        'BandManager',
        '$stateParams',
        'constants',
        'RecursionHelper',
        function($q, $scope, BandManager, $stateParams, constants, RecursionHelper){
            //constants.projectConfiguration..forEach(function(page))
            $scope.pageConfiguration = constants.projectConfiguration.pages.filter(function(page){
                return page.id === $stateParams.pageId;
            })[0];
            if(!$scope.pageConfiguration){
                console.error('Empty Page Configuration');
                return;
            }
            $scope.loading = true;
            function populateAllBands(){
                var bandPromiseArr = [];
                $scope.pageConfiguration.bands.forEach(function(band){
                    bandPromiseArr.push(BandManager.getSingleBandDataWithConfig(band.band_id));
                });
                $q.all(bandPromiseArr).then(function(responseArr){

                    populateAllBandsDone(responseArr);
                }, function(err){
                    console.error('Error in getting band details: ', err);
                });
            }

            function populateAllBandsDone(bandResponseArr){
                $scope.bands = bandResponseArr;
                $scope.bands.forEach(function(band){
                    if(band.config && band.config.view){
                        if(band.config.view === 'normalRailLandscape'){
                            band.width = 310 * band.config.count;
                        }
                        else if(band.config.view === 'normalRailPortrait'){
                            band.width = 210 * band.config.count;
                        }
                        else if(band.config.view === 'featuredRail'){
                            band.width = 460 + 230 * (Math.ceil((band.config.count -1)/2));
                        }
                    }
                });
                $scope.loading = false;
            }
            populateAllBands();
        }
    ]);