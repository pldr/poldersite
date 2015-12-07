angular.module('poldersite')
  .controller('HomeCtrl',
    function ($rootScope, $scope, $state, Person, Regio, SoortLid, soortlid, regio, bedrijf, username, authService) {
    if(authService.getToken()==null){
        $state.go('login');
     }else{

      $scope.rootScope = $rootScope;
      $scope.regio=regio;
      $scope.soortlid=soortlid;

       $scope.bedrijf = bedrijf;
       $scope.username = username;

      //start checkbox
      $scope.selection=[];
      //end start checkbox
      $scope.clickSort=function(sortField, reverse){
        $rootScope.mySort=sortField;
        $rootScope.reverse=reverse;
      };

      $scope.clickNew = function () {
        alert('Er is op nieuw geklikt!');
      };
      $scope.clickCancel = function () {
        alert('Er is op Doe Iets geklikt!');
      };

      $scope.clickGet = function () {
        Person.getPersons();
      };

      $scope.goViewPerson = function (id) {
        $state.go('viewPerson', {id: id});
      };

      $scope.delPerson=function(){
        angular.forEach($scope.selection, function (person) {

          _.remove($rootScope.persons,function(persons){
            return persons.id===person;
          });
        });
         $scope.selection=[];
         $scope.detail=false;
      };

      $scope.checkAll=function(checked){
        if(checked){
          $scope.selectedObjs=checked;
          angular.forEach($scope.persons, function (person) {
            $scope.selection.push(person.id);
          });
        }else{
          $scope.selectedObjs=checked;
          $scope.selection=[];
        }
      };

      //<div... ng-if="deateil"
      // $scope.viewPerson=function(person){
      //   $scope.detail=true;
      //    $scope.person.selected=person.id;
      // }

   $scope.toggleObjSelection = function($event, personId) {
     var idx = $scope.selection.indexOf(personId);
       if (idx > -1) {
         $scope.selection.splice(idx, 1);
         $scope.detail=false;
       }
       else {
         $scope.selection.push(personId);
         $scope.detail=true;
       }
   }

    /*---------------------------------------------------------------------- */
/*
   $scope.rowClicked = function(person) {
       person.selected = !person.selected;
       $scope.detail=person.selected;
       $scope.per=Person.getPerson(person.id);
       if(person.selected){
         $scope.selection.push(person.id);
       }else{
         $scope.selection.splice($scope.selection.indexOf(person.id),1);
       }
   };
*/
    $scope.rowClicked = function(person) {
		person.selected = !person.selected;
		$scope.detail=person.selected;
		// console.log('rowclicked ' + person.id + ' ' + person.lastname);
		//$scope.per=Person.getPerson(person.id);
		$state.go('viewPerson', {id: person.id});
    };

    //20150815 deze view toegevoegd anders wordt scherm niet schoom
    $scope.viewPerson = function(id) {
		$scope.detail = true;
		$scope.per=Person.getPerson(id);
        if(person.selected){
          $scope.selection.push(id);
        }else{
          $scope.selection.splice($scope.selection.indexOf(id),1);
        }
    };
    /*---------------------------------------------------------------------- */

    $scope.clearFilter = function () {
        $scope.filter.id="";
        $scope.filter.name="";
        $scope.filter.lastname="";
        $scope.filter.regio="";
        $scope.filter.soortlid="";
        $scope.display.id=true;
        $scope.display.name=true;
        $scope.display.lastname=true;
        $scope.display.regio=true;
        $scope.display.soortlid=true;
      };

      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Person.updatePerson($scope.per.id, $scope.per);
         // $state.go('home');
        }
      };

      $scope.clickDel = function () {
        Person.nextPerson($scope.per.id,function (person) {
          if (person) {
            Person.delPerson($scope.per.id);
            $scope.per = person;
            $scope.detail=false;
          }
        });

       // $state.go('home'); // Terug naar homepage
      };

      $scope.clickCancel = function () {
        $scope.detail = false;
      };

      $scope.clickNext = function () {
        Person.nextPerson($scope.per.id,function (person) {
          if (person) {
            $scope.per = person;
          }
        });
      };

      $scope.clickPre = function () {
        Person.prePerson($scope.per.id, function (person) {
          if (person) {
            $scope.per = person;
          }
        });
      };
     }
    });
