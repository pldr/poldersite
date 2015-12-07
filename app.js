angular.module('poldersite', [
    'ui.utils',
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngMessages',
    'ngResource',
    'smart-table',
    'ui.checkbox',
    'angular-loading-bar',
    'chart.js',

    //our components
    'ceibo.components.table.export',
    'ceibo.components.commons.elements',
    'pldr.components.header',
    //niet voor ps 'ceibo.components.sideBar',

    //our modules
    'poldersite.auth',
//    'poldersite.admin',
    'poldersite.dashboard',

]);
angular.module('poldersite').config(function ($urlRouterProvider, loginUrl, $provide) {

  /* Add New States Above */
  $urlRouterProvider.otherwise(loginUrl);

    $provide.decorator('$exceptionHandler', extendExceptionHandler);

    extendExceptionHandler.$inject = ['$delegate'];

    function extendExceptionHandler($delegate) {

        return function(exception, cause) {
            $delegate(exception, cause);
            var errorData = {
                exception: exception,
                cause: cause
            };
            /**
             * Could add the error to a service's collection,
             * add errors to $rootScope, log errors to remote web server,
             * or log locally. Or throw hard. It is entirely up to you.
             * throw exception;
             */
            toastr.error('There was an error in the server side. ¨Please, try again later.');
        };
    }

})
  .run(function ($rootScope, Person,SoortLid,Regio) {
    $rootScope.persons = [];
    $rootScope.soortl=[];
    $rootScope.regio=[];
    Person.getPersons();
    $rootScope.mySort = 'id';
    $rootScope.reverse = false;
    $rootScope.display={id:true, name:true, lastname:true, soortlid:true, regio:true, action: true, description: true,omschrijving:true};
    $rootScope.filter={id:'', name:'', lastname:'', soortlid:'', regio:''};

    $rootScope.safeApply = function (fn) {
      var phase = $rootScope.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof (fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
  })

    .constant('loginState', 'auth.login')
//    .constant('loginUrl', '/access/login')
    .constant('loginUrl', '/home')
    .constant('homeState', 'home.init')
    .constant('appParentState', 'home')
    .constant('GLOBALS', {
        personUrl: 'data/persons.json',
        regioUrl: 'data/regio.json',
        soortlidUrl: 'data/soortlid.json'
    });
