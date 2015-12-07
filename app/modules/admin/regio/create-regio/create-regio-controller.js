angular.module('poldersite')
	.controller('createRegioCtrl',
		function($scope, $state, Regio, bedrijf, username, authService){
         if(authService.getToken()==null){
           $state.go('auth.login');
         }else{

           $scope.bedrijf = bedrijf;
           $scope.username = username;

		 $scope.addRegio = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                Regio.addRegio($scope.regios);
	          $state.go('regio.list'); // Terug naar homepage
	        }
    	}
         }
	});
