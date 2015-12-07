angular.module('poldersite')
  .factory('User',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope, $q, userService)
     {
      var currentUser = userService.get(); //20150801
      var lastId="";
//      var myUser = new TUser();
      var myUser = new TUser();
      return {
        findAll: function () {
			$rootScope.display.userUsername=true;
			$rootScope.display.userPasswrd=true;
			var defer = $q.defer();
            userService.get().then(function(res){
                myUser.fromObject({Bedrijf : 0
				                 , Username : 'admin'
								 , Passwrd : '123456'});
          // Service.SvcUser("R", res.Username, myUser, function(result) {
          // we don't need a common username
          Service.SvcUser("R", myUser, function(result) {
                defer.resolve(result.toObject());
//           alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },
        // a user can only be found be specifying the right username + passwrd

        getUser: function (userId, password) {
            var defer = $q.defer();
            if(password) {
                myUser.fromObject({Bedrijf : 0
                    ,Username : userId
                    ,Passwrd : password
                });
                Service.SvcUser("R", myUser, function(result) {
                    var data = _.find(result.toObject(), {'Username':userId});
                    defer.resolve(data);
                    alert(JSON.stringify(data));
                });
            } else {
                userService.get().then(function(res){
                    myUser.fromObject({Bedrijf : 0
                        ,Username : userId
                        ,Passwrd : '123456'
                    });
                    Service.SvcUser("R", myUser, function(result) {
                        var data = _.find(result.toObject(), {'Username':userId});
                        defer.resolve(data);
                        alert(JSON.stringify(data));
                    });
                });
            }

            return defer.promise;
        },

          getUserByMail : function(query) {
              var getUserByMailPromise = $q.defer();

                  myUser.fromObject({
                     Bedrijf : 0,
                      Email: query
                  });

              Service.SvcUser("R", myUser, function(result) {
                  var data = _.find(result.toObject(), {'Email':query});
                  defer.resolve(data);
                  alert(JSON.stringify(data));
              });


              return getUserByMailPromise.promise;
          },

          checkUserName : function(userName) {

              var checkUserNamePromise = $q.defer();

              this.getUser(userName).then(function(result){
                  if(result) {
                      checkUserNamePromise.reject(true)
                  }

                  checkUserNamePromise.resolve(true);
              });

              return checkUserNamePromise.promise;

          },

        addUser: function (userData) {

            var addUserPromise = $q.defer();
           userService.get().then(function(res){
                myUser.fromObject({
                    Bedrijf : res.Bedrijf
				           ,Username : userData.username
								   ,Passwrd : userData.password
                   ,Email : userData.email
                   ,Name : userData.name
                });
                Service.SvcUser("C", myUser, function(result){
                    addUserPromise.resolve(!!result.items && !!result.items[0]);
                });
            });

            return addUserPromise.promise;
        },

        updateUser:function(userData){
            userService.get().then(function(res){
                Service.SvcUser("U", userData);
            });
        },

        delUser:function(User,Passwrd){
         userService.get().then(function(res){
                myUser.fromObject({Bedrijf : res.Bedrijf
				                       ,Username : User
									   ,Passwrd : Passwrd});
//             Service.SvcUser("D", res.Username, myUser);
             Service.SvcUser("D", myUser);
         });

          // _.remove($rootScope.user,function(users){
          //   return users.user===userId;
          // });
        },
        nextUser:function(userId, cb){
          var index=_.findIndex($rootScope.user, function(users){
            return users.User===userId;
          });
          if(index===-1 || index+1 >= $rootScope.user.length){
           // return cb();
           return cb($rootScope.user[0]);
          }
          return cb($rootScope.user[index+1]);
        },
        preUser:function(userId, cb){
          var index=_.findIndex($rootScope.user, function(users){
            return users.User===userId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.user[0]);
          }
          return cb($rootScope.user[index-1]);
        }
      };
    }]);
