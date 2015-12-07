angular.module('poldersite')
  .controller('SoortLidController',
   function ($rootScope, $scope, $state, SoortLid, bedrijf, username, soortlids, authService, homeState) {

       var model = {
           selection : [],
           soortlids: soortlids
       };

       $rootScope.soortlid = soortlids;

       $scope.bedrijf = bedrijf;
       $scope.username = username;

     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          SoortLid.updateSoortLid($scope.ah.soortlid, $scope.reg);
         // $state.go('home');
        }
      }

      function clickDel(soortlid) {

          SoortLid.nextSoortLid(soortlid, function (soortlidId) {
              if (soortlidId) {
                  SoortLid.delSoortLid(soortlid);
                  $state.go(homeState);
              }
          });
      }


        angular.extend(this,{
            model: model,
            soortlidService: SoortLid,
            clickSave: clickSave,
            clickDel: clickDel

        })

    });
