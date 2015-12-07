angular.module('poldersite')
.factory('userService', function($resource, $cookieStore, $q) {


        var get = function() {
            var deferPromise = $q.defer();
            deferPromise.resolve($cookieStore.get('user'));
            return deferPromise.promise;
        };

        return {
            get : get
        }

});
