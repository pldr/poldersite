angular.module('poldersite.dashboard', [])
    .constant('dashboardParentStata','admin')

    .config(function($stateProvider, dashboardParentStata) {
        $stateProvider

            .state('dashboard', {
                url: '/dashboard',
                parent: dashboardParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('dashboard.list', {
                url:'/list',
//                templateUrl:'app/modules/dashboard/dashboard.html',
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
