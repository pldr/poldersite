angular.module('poldersite.user')
  .controller('UserController',
   function ($rootScope, $scope, $state, bedrijf, username, User, user, authService) {
    if(authService.getToken()==null){
       $state.go('login');
     }else{
       //start checkbox
      $rootScope.user=user;
      $scope.user=user;

       $scope.bedrijf = bedrijf;
       $scope.username = username;

      $scope.selection=[];
      $scope.toggleSelection = function toggleSelection(personId) {
       var idx = $scope.selection.indexOf(personId);
       if (idx > -1) {
         $scope.selection.splice(idx, 1);
       }
       else {
         $scope.selection.push(personId);
       }
      };
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
        User.findAll();
      };

      $scope.goViewUser = function (userId) {
        $state.go('viewUser', {userId: userId});
      };

      $scope.delUser=function(){
        angular.forEach($scope.selection, function (user) {
          _.remove($rootScope.user,function(users){
            return users.user===user;
          });
        });
         $scope.selection=[];
      };

      $scope.checkAll=function(checked){
        if(checked){
          $scope.selected=checked;
          angular.forEach($scope.user, function (users) {
            $scope.selection.push(users.user);
          });
        }else{
          $scope.selected=checked;
          $scope.selection=[];
        }
      };

      $scope.clearFilter=function(){
        $scope.filter.user="";
        $scope.filter.passwrd="";
        $scope.display.userUser=true;
        $scope.display.userPasswrd=true;
      }

      $scope.viewUser=function(userId){
        $scope.detail = true;
        $scope.reg=User.getUser(userId);
      }

      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          User.updateUser($scope.ah.user, $scope.reg);
         // $state.go('home');
        }
      };

//      $scope.clickDel = function () {
//        User.nextUser($scope.ah.user,function (userId) {
//          if (userId) {
//            User.delUser($scope.ah.user);
//            $scope.reg = userId;
//          }
//        });
//       // $state.go('home'); // Terug naar homepage
//	  };

      $scope.clickDel = function (userId) {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            User.delUser(userId);
//            $state.go('adminUser');
          }
      };

      $scope.goViewUser = function (userId) {
        $state.go('user.view', {userId: userId});
      };

	  $scope.clickCancel = function () {
        $scope.detail = false;
      };

      $scope.clickNext = function () {
        User.nextUser($scope.ah.user,function (userId) {
          if (userId) {
            $scope.reg = userId;
          }
        });
      };

      $scope.clickPre = function () {
        User.preUser($scope.ah.user, function (userId) {
          if (userId) {
            $scope.per = userId;
          }
        });
      };
     }
    });
