angular.module('poldersite')
  .controller('viewSoortLidCtrl',
    function ($scope, SoortLid, $state, $stateParams, bedrijf, username, Person, authService) {
      if(authService.getToken()==null){
             $state.go('login');
      }else{

          $scope.bedrijf = bedrijf;
          $scope.username = username;

          SoortLid.getSoortLid($stateParams.soortlid).then(function(res){
            $scope.soortl = res;
          });
          $scope.clickSave = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                SoortLid.updateSoortLid($scope.soortl.SoortLid
				                      , $scope.soortl.Omschrijving);
                $state.go('adminLidsoorten');
            }
          };

          $scope.clickDel = function () {
              var msg = confirm("Verwijderen ? J/N");
              if (msg == true) {
                SoortLid.delSoortLid($scope.soortl.SoortLid
				                   , $scope.soortl.Omschrijving);
                 $state.go('adminLidsoorten'); // Terug naar homepage
              }
          };

          $scope.clickCancel = function () {
            SoortLid.getSoortLid($stateParams.soortlid).then(function(res){
            $scope.soortl = res;
            });
          };

          $scope.clickNext = function () {
            SoortLid.nextSoortLid($scope.soortl.SoortLid,function (soortlid) {
              if (soortlid) {
                $scope.soortl = soortlid;
              }
            });
          };

          $scope.clickPre = function () {
            SoortLid.preSoortLid($scope.soortl.SoortLid, function (soortlid) {
              if (soortlid) {
                $scope.soortl = soortlid;
              }
            });
          };
      }
    });
