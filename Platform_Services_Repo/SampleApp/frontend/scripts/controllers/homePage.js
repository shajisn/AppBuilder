/**
 * Created by Jithu.jose on 3/7/2016.
 */

angular.module('mediaApp')
    .controller('HomePageCtrl', [
        '$q',
        '$scope',
        'configuration',
        'VODManager',
        function($q, $scope, configuration, VODManager){
            $scope.configuration = configuration;
            $scope.loading = true;
            function populateAllBands(){
                var bandPromiseArr = [];
                configuration.bands.forEach(function(band){
                    bandPromiseArr.push(VODManager.getSingleBandDataWithConfig(band.id));
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
                    if(band.config.view === 'normalRailLandscape'){
                        band.width = 310 * band.config.count;
                    }
                    else if(band.config.view === 'normalRailPortrait'){
                        band.width = 210 * band.config.count;
                    }
                    else if(band.config.view === 'featuredRail'){
                        band.width = 460 + 230 * (Math.ceil((band.config.count -1)/2));
                    }
                });
                $scope.loading = false;
            }
            populateAllBands();
        }
    ]);