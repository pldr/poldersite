angular.module('poldersite')
  .controller('RegioController',
   function ($rootScope, $scope, $state, Regio, regios, bedrijf, username, authService, homeState) {

       var model = {
           selection : [],
           regios: regios
       };

       $rootScope.regio = regios;

       $scope.bedrijf = bedrijf;
       $scope.username = username;

     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Regio.updateRegio($scope.ah.regio, $scope.reg);
         // $state.go('home');
        }
      }

      function clickDel(regio) {

          Regio.nextRegio(regio, function (regioId) {
              if (regioId) {
                  Regio.delRegio(regio);
                  $state.go(homeState);
              }
          });
      }


        angular.extend(this,{
            model: model,
            regioService: Regio,
            clickSave: clickSave,
            clickDel: clickDel

        })

    });
