angular.module('poldersite')
  .controller('viewSoortLidCtrl',
    function ($scope, SoortLid, $state, bedrijf, username, $stateParams) {
//      if(authService.getToken()==null){
//           $state.go('login');
//         }else{

       $scope.bedrijf = bedrijf;
       $scope.username = username;

	  SoortLid.getSoortLid($stateParams.soortlidId).then(function(res){
        $scope.soortlid = res;
      });

        $scope.soortlidService = SoortLid;

	  $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            SoortLid.updateSoortLid($scope.soortlid);
             $state.go('soortlid.list');
        }
      };

        $scope.deletionOnSuccess = function() {
            $state.go('soortlid.list')
        };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            SoortLid.delSoortLid($scope.soortlid.SoortLid,$scope.soortlid.Omschrijving);
            $state.go('soortlid.list'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         SoortLid.getSoortLid($stateParams.soortlidId).then(function(res){
          $scope.soortlid = res;
         });
      };

      $scope.clickNext = function () {
        SoortLid.nextSoortLid($scope.soortlid.SoortLid,function (soortlidId) {
          if (soortlidId) {
            $scope.soortlid = soortlidId;
          }
        });
      };

      $scope.clickPre = function () {
        SoortLid.preSoortLid($scope.soortlid.SoortLid, function (soortlidId) {
          if (soortlidId) {
            $scope.soortlid = soortlidId;
          }
        });
      };
//  }
    });
