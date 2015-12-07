angular.module('poldersite')
  .directive('pHeader', function () {
    return {
      restrict: 'AE',
      templateUrl: 'app/directives/header/header.html',
      controller: function ($rootScope, $scope, authService) {
        $scope.user = authService.getCurrentUser();
        $rootScope.$on('updateCurrentUser', function (event, user) {
          $scope.user = user;
        });
      }
    };
  });
