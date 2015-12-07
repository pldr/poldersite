angular.module('poldersite.regio', [])
    .constant('regioParentStata','admin')

    .config(function($stateProvider, regioParentStata) {
        $stateProvider

            .state('regio', {
                url: '/regio',
                parent: regioParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('regio.list', {
                url:'/list',
                templateUrl:'app/modules/admin/regio/regio.html',
                controller:'RegioController as ctrl',
                resolve: {
                    regios: function (Regio) {
                        return Regio.findAll();
                    },
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            })
            .state('regio.create',
            {
                url:'/create',
                templateUrl:'app/modules/admin/regio/create-regio/create-regio.html',
                controller:'createRegioCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            })

            .state('regio.view',
            {
                url:'/:regioId',
                templateUrl:'app/modules/admin/regio/view-regio/view-regio.html',
                controller:'viewRegioCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            });

    });
