angular.module('poldersite')
  .factory('authService', function ($location, $rootScope, $http, userService, $cookieStore, $q, User) {
    var currentUser = {};
    if ($cookieStore.get('token')) {
      currentUser = userService.get();
    }
    var updateCurrentUser = function (user) {
      $rootScope.$broadcast('updateCurrentUser', user);
    };
    return {
      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function (user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('data/user.json', {
          email: user.email,
          password: user.password
        })
          .success(function (data) {
            //check username & password
            if (data.username !== user.username || data.password !== user.password) {
              return callback({message: 'Username or password does not match'});
            }
            //res success login
            $cookieStore.put('token', data.token);
            currentUser = userService.get();
            updateCurrentUser(currentUser);
            deferred.resolve(data);
            return cb();
          })
          .error(function (err) {
            this.logout();
            deferred.reject(err);
            return cb(err);
          }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function () {
        $cookieStore.remove('token');
        currentUser = {};
        updateCurrentUser(currentUser);
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function (user, callback) {
        var cb = callback || angular.noop;

        return userService.save(user,
          function (data) {
            //$cookieStore.put('token', data.token);
            //currentUser = userService.get();
            return cb(user);
          },
          function (err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function (oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return userService.changePassword({id: currentUser._id}, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function (user) {
          return cb(user);
        }, function (err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function () {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function () {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function (cb) {
        if (currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function () {
            cb(true);
          }).catch(function () {
            cb(false);
          });
        } else if (currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function () {
        return currentUser.role === 'admin';
      },

        /**
         * Forgot password
         */

        forgotPassWord: function() {
            User.getUser()

            User.updateUser()
        },

      /**
       * Get auth token
       */
      getToken: function () {
//20150826 temp        return $cookieStore.get('token');
        return 'A';
      },

      recoverPassword: function (email, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('auth/recoverPassword', {
          email: email
        })
          .success(function (data) {
            deferred.resolve(data);
            return cb();
          })
          .error(function (err) {
            deferred.reject(err);
            return cb(err);
          }.bind(this));

        return deferred.promise;
      },

      confirmResetPasswordToken: function (token, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('auth/confirmPasswordResetToken/' + token)
          .success(function (data) {
            //do login
            $cookieStore.put('token', data.token);
            currentUser = userService.get();

            deferred.resolve(data);
            return cb();
          })
          .error(function (err) {
            deferred.reject(err);
            return cb(err);
          }.bind(this));

        return deferred.promise;
      }
    };
  });
