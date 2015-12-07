angular.module('poldersite.user')
  .controller('viewUserCtrl',
    function ($scope, User, user, $state, bedrijf, username, $stateParams,authService) {
      if(authService.getToken()==null){
           $state.go('login');
         }else{

    $scope.user = user;

       $scope.bedrijf = bedrijf;
       $scope.username = username;

      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            User.updateUser($scope.user);
            $state.go('home.init');
        }
      };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            User.delUser($scope.user.User,$scope.user.Passwrd);
            $state.go('adminUser'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         User.getUser($stateParams.userId).then(function(res){
          $scope.user = res;
         });
      };

      $scope.clickNext = function () {
        User.nextUser($scope.user.User,function (userId) {
          if (userId) {
            $scope.user = userId;
          }
        });
      };

      $scope.clickPre = function () {
        User.preUser($scope.user.User, function (userId) {
          if (userId) {
            $scope.user = userId;
          }
        });
      };
  }
    });
