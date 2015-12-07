angular.module('poldersite.auth', ['angular-flash.service', 'angular-flash.flash-alert-directive','uiRouterStyles'])
    .constant('passwordMinLength', 4)
    .constant('userMinLength', 4)
  .config(function ($stateProvider, flashProvider) {

    flashProvider.errorClassnames.push('alert-danger');

    $stateProvider

        .state('auth', {
            url: '/access',
            abstract: true,
            template: '<div ui-view=""></div>',
            data: {
                css: ['app/modules/auth/form-elements.css', 'app/modules/auth/style.css']
            }
        })

        .state('auth.login', {
        url: '/login',
        templateUrl: 'app/modules/auth/login/login.html',
        controller: 'LoginCtrl as ctrl',
        params: {
            username : null
        }

        })

	  ;
  });

