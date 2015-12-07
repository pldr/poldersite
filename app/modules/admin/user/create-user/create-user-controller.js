angular.module('poldersite.user')
	.controller('createUserCtrl',
		function($scope, $state, User, bedrijf, username, authService){
         if(authService.getToken()==null){
           $state.go('login');
         }else{

       $scope.bedrijf = bedrijf;
       $scope.username = username;

		 $scope.addUser = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                User.addUser( $scope.users.user, $scope.users.passwrd);
	          $state.go('user.list'); // Terug naar homepage
	        }
    	}
         }

	});
