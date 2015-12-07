angular.module('poldersite')
  .controller('CreatePersonCtrl',
    function ($rootScope, $scope, Person, $state, Regio, Soortlid, regio, soortlid, bedrijf, username, authService) {
     if(authService.getToken()==null){
             $state.go('login');
    }else{
          $scope.regio=regio;
          $scope.soortlid=soortlid;

           $scope.bedrijf = bedrijf;
           $scope.username = username;

          $scope.addPerson = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
              Person.addPerson($scope.person);
              $state.go('home'); // Terug naar homepage
            }
          };
      }
    });
