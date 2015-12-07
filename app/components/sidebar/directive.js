/**
 * Created by mmasuyama on 9/15/2015.
 */
var ceiboSideBarCtrl = function($rootScope, $scope, $window, userService) {
  var ctrl = this;
    ctrl.rootScope = $rootScope;

    ctrl.toggleSidebar = function(){
        $rootScope.toggle = !$rootScope.toggle;
        ctrl.checkPhone();
    };

    ctrl.setToggle = function(){
        $window.innerWidth <= 767 ? $rootScope.toggle = true : $rootScope.toggle = false;
    };

    ctrl.checkPhone = function(){
        $window.innerWidth <= 480 && !$rootScope.toggle ? $rootScope.phone = true : $rootScope.phone = false;
    };

    ctrl.updateScrollBar = function(){
        $('.scroller').perfectScrollbar('update');
    };

    function init() {
        ctrl.setToggle();
        userService.get().then(function(userData) {
            ctrl.Bedrijf = userData.Bedrijf;
        });

        var id;
        $(window).resize(function() {
            clearTimeout(id);
            id = setTimeout(function () {
                $scope.$apply(function () {
                    ctrl.updateScrollBar();
                    ctrl.setToggle();
                    ctrl.checkPhone();
                });
            }, 100);
        });
    }

    init();

};

angular.module('ceibo.components.sideBar', ['perfect_scrollbar'])
  .controller('ceiboSideBarCtrl', ceiboSideBarCtrl)
.directive('ceiboSidebar', function() {
    return {
        restrict: 'E',
        transclude: true,
        controller: 'ceiboSideBarCtrl as ctrl',
        templateUrl: 'app/components/sidebar/sidebar.html',
        link: function(scope, element, attrs, controllers) {

        }
    };
})

;

