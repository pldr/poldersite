angular.module('poldersite')
  .controller('viewRegioCtrl',
    function ($scope, Regio, $state, bedrijf, username, $stateParams) {
//      if(authService.getToken()==null){
//           $state.go('login');
//         }else{

       $scope.bedrijf = bedrijf;
       $scope.username = username;

	  Regio.getRegio($stateParams.regioId).then(function(res){
        $scope.regio = res;
      });

        $scope.regioService = Regio;

	  $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Regio.updateRegio($scope.regio);
             $state.go('regio.list');
        }
      };

        $scope.deletionOnSuccess = function() {
            $state.go('regio.list')
        };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            Regio.delRegio($scope.regio.Regio,$scope.regio.Omschrijving);
            $state.go('regio.list'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         Regio.getRegio($stateParams.regioId).then(function(res){
          $scope.regio = res;
         });
      };

      $scope.clickNext = function () {
        Regio.nextRegio($scope.regio.Regio,function (regioId) {
          if (regioId) {
            $scope.regio = regioId;
          }
        });
      };

      $scope.clickPre = function () {
        Regio.preRegio($scope.regio.Regio, function (regioId) {
          if (regioId) {
            $scope.regio = regioId;
          }
        });
      };
//  }
    });
