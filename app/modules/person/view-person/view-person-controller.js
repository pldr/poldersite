angular.module('poldersite')
  .controller('ViewPersonCtrl',
    function ($scope,$rootScope, Person, $state, $stateParams, Regio, Soortlid, regio, soortlid, bedrijf, username, authService) {
    if(authService.getToken()==null){
             $state.go('login');
    }else{
      $scope.regio = regio;
      $scope.soortlid = soortlid;
      $scope.person = angular.copy(Person.getPerson($stateParams.id));

       $scope.bedrijf = bedrijf;
       $scope.username = username;

      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Person.updatePerson($scope.person.id, $scope.person);
          $state.go('home');
        }
      };

      $scope.clickDel = function () {
        Person.delPerson($scope.person.id);
        $state.go('home'); // Terug naar homepage
      };

      $scope.clickCancel = function () {
        $scope.person = angular.copy(Person.getPerson($stateParams.id));
      };

      $scope.clickNext = function () {
        Person.nextPerson($scope.person.id,function (person) {
          if (person) {
            $scope.person = person;
          }
        });
      };

      $scope.clickPre = function () {
        Person.prePerson($scope.person.id, function (person) {
          if (person) {
            $scope.person = person;
          }
        });
      };
     }
    });
