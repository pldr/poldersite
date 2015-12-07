angular.module('poldersite')
    .config(function ($stateProvider) {
        $stateProvider

            .state('home', {
                url:'/app',
                abstract: true,
//                templateUrl: 'app/modules/home/abstract.html',
                templateUrl:'home/business/business_start_2.html',
/*
                resolve : {
                    leaveItEnter: function(authService, loginState, $state) {
                        //It is the main state, it will be checked always before load any screen
                        if(!authService.getToken()) {
                            $state.go('auth.login');
                        }
                    }
                }
*/				
                resolve: {
                    dashboards: function (DashBoard) {
                        return DashBoard.findAll();
                    },
                    bedrijf: function($cookieStore) {
                        return $cookieStore.get('user').Bedrijf;
                    },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }


            })

            .state('home.init', {
                url:'/list',
                //templateUrl:'app/modules/dashboard/dashboard.html',
                templateUrl:'home/business/business_start_2.html',
				controller:'DashBoardController as ctrl',
                resolve: {
                    dashboards: function (DashBoard) {
                        return DashBoard.findAll();
                    },
                    bedrijf: function($cookieStore) {
                        return $cookieStore.get('user').Bedrijf;
                    },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            });

    });
