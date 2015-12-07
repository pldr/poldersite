angular.module('poldersite')
  .factory('Regio',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
      var lastId="";
      var myRegio = new TRegio();
      return {
        findAll: function () {
//			$rootScope.display.regioRegio=true;       //20150801 always display
//			$rootScope.display.regioOmschrijving=true;
			var defer = $q.defer();
            userService.get().then(function(res){
                myRegio.fromObject({Bedrijf : res.Bedrijf,Regio : '', Omschrijving : ''});
                Service.SvcRegio("R", res.Username, myRegio, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(myRegio));
//          alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },
        getRegio: function (regioId) {
            var defer = $q.defer();
             userService.get().then(function(res){
             myRegio.fromObject({Bedrijf : res.Bedrijf,Regio : regioId, Omschrijving : ''});
             //myRegio.fromObject({Bedrijf : res.Bedrijf,Regio : '', Omschrijving : ''});
             Service.SvcRegio("R", res.Username, myRegio, function(result) {
                var data = _.find(result.toObject(), {'Regio':regioId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addRegio: function (regioData) {
           userService.get().then(function(res){
                myRegio.fromObject({Bedrijf : res.Bedrijf,Regio : regioData.Regio, Omschrijving : regioData.Omschrijving});
                Service.SvcRegio("C", res.Username, myRegio);
            });

        },
        updateRegio:function(regioData){
           userService.get().then(function(res){
                myRegio.fromObject({Bedrijf : res.Bedrijf,Regio : regioData.Regio, Omschrijving : regioData.Omschrijving});
                Service.SvcRegio("U", res.Username, myRegio);
            });
        },

        delRegio: function(Regio,Omschrijving){

            var delRegioPromise = $q.defer();

            userService.get().then(function(res){
                myRegio.fromObject({Bedrijf : res.Bedrijf,Regio : Regio, Omschrijving : Omschrijving});
                Service.SvcRegio("D", res.Username, myRegio, function(result){
                    console.log(result);

                    delRegioPromise.resolve(result)
                });
            });

            return delRegioPromise.promise;



          // _.remove($rootScope.regio,function(regios){
          //   return regios.regio===regioId;
          // });
        },
        nextRegio:function(regioId, cb){
          var index=_.findIndex($rootScope.regio, function(regios){
            return regios.Regio===regioId;
          });
          if(index===-1 || index+1 >= $rootScope.regio.length){
           // return cb();
           return cb($rootScope.regio[0]);
          }
          return cb($rootScope.regio[index+1]);
        },
        preRegio:function(regioId, cb){
          var index=_.findIndex($rootScope.regio, function(regios){
            return regios.Regio===regioId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.regio[0]);
          }
          return cb($rootScope.regio[index-1]);
        }
      };
    }]);
