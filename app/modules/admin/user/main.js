/**
 * Created by mmasuyama on 8/29/2015.
 */
angular.module('poldersite.user', [])
    //configure the parent state for this module here
    .constant('userParentState', 'admin')
    //configuration
    .config(function($stateProvider, userParentState){
        $stateProvider

            .state('user', {
                url:'/user',
                parent: userParentState,
                abstract: true,
                template: '<div ui-view=""></div>'
             })

            .state('user.list',
                {
                    url:'/list',
                    templateUrl:'app/modules/admin/user/user.html',
                    controller:'UserController',
                    resolve: {
                        user: function (User) {
                            return User.findAll();
                        },
                       bedrijf: function($cookieStore) {
                           return $cookieStore.get('user').Bedrijf;
                       },
                       username: function($cookieStore) {
                           return $cookieStore.get('user').Username;
                       }
                    }
                })
            .state('user.create',
                {
                    url:'/create',
                    templateUrl:'app/modules/admin/user/create-user/create-user.html',
                    controller:'createUserCtrl'
                })
            .state('user.view',
                {
                    url:'/:userId',
                    templateUrl:'app/modules/admin/user/view-user/view-user.html',
                    controller:'viewUserCtrl',
                    resolve: {
                        user: function(User, $cookieStore, $stateParams) {
                            //return User.getUser($stateParams.userId).then(function(res){
                            return User.getUser($cookieStore.get('user').Username).then(function(res){
                                return res;
                            });
                        },
                       bedrijf: function($cookieStore) {
                           return $cookieStore.get('user').Bedrijf;
                       },
                       username: function($cookieStore) {
                           return $cookieStore.get('user').Username;
                       }
                    }
                })


    });


