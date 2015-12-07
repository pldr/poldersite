//use the array syntax or $injector for define a the controller function with his dependencies, or it will break when minified.

var LoginCtrl = ['User', '$state','$stateParams', '$cookieStore', 'flash', 'homeState',function (User,$state, $stateParams, $cookieStore, flash, homeState) {
    var ctrl = this;

    ctrl.suggestions = {};

    var model = {
        username: $stateParams.username || ''
    };

    function login () {
        //Todo refactor this with an http interceptor
// temporary 20150826 couldn't pass login
//        if(authService.getToken()!=null){
//            $state.go('home');
//        } else {

            User.getUser(ctrl.auth.username, ctrl.auth.password).then(function(data){
                console.log(data);
                if(!data) {
                    flash.error = 'Invalid username';
                    ctrl.suggestions = {
                        register: true
                    };
                } else {
                    if(data.Passwrd === ctrl.auth.password) {

                        //save user as cookie
                        $cookieStore.put('user', data);

                        $state.go(homeState);
                    } else {
                        flash.error = 'Invalid password';
                        ctrl.suggestions = {
                            forgot: true
                        };
                    }
                }
            });

//        }
    }

    angular.extend(ctrl,{
        auth: model,
        login: login
    });
}];

angular.module('poldersite.auth')
  .controller('LoginCtrl', LoginCtrl);
