var pHeaderCtrl = function($state, $cookieStore, $element, $rootScope) {
  var ctrl = this;

    //*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/
    // TESTING
    //*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/
    ctrl.user = $cookieStore.get('user');

    var toggleAsideNav = function(){
        var asideNav = $aside.open({
            templateUrl: 'app/components/header/aside.nav.html',
            controller: 'AsideNavController as AsideNavController',
            placement: 'left',
            size: 'sm'
        });

        $rootScope.$on('$stateChangeStart', function() {
            if(asideNav){
                asideNav.close();
            }
        });
    };

    angular.extend(ctrl,{
        toggleAsideNav : toggleAsideNav
    });



};

angular.module('pldr.components.header', [])
  .controller('pHeaderCtrl', pHeaderCtrl)
  .directive('pHeader', function(){
      return {
          templateUrl: 'app/components/header/header.html',
          scope: {
              user: '='
          }, //isolate or not
          restrict : 'AE', //A = attribute, C = class, E = Element
          controller: 'pHeaderCtrl as ctrl',
          bindToController: true //true or false
      }
  })
;
