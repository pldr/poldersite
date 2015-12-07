angular.module('poldersite')
  .factory('SoortLid',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
      var lastId="";
      var mySoortLid = new TSoortLid();
      return {
        findAll: function () {
//			$rootScope.display.soortlidSoortLid=true;       //20150801 always display
//			$rootScope.display.soortlidOmschrijving=true;
			var defer = $q.defer();
            userService.get().then(function(res){
                mySoortLid.fromObject({Bedrijf : res.Bedrijf,SoortLid : '', Omschrijving : ''});
                Service.SvcSoortLid("R", res.Username, mySoortLid, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(mySoortLid));
//          alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },
        getSoortLid: function (soortlidId) {
            var defer = $q.defer();
             userService.get().then(function(res){
             mySoortLid.fromObject({Bedrijf : res.Bedrijf,SoortLid : soortlidId, Omschrijving : ''});
             //mySoortLid.fromObject({Bedrijf : res.Bedrijf,SoortLid : '', Omschrijving : ''});
             Service.SvcSoortLid("R", res.Username, mySoortLid, function(result) {
                var data = _.find(result.toObject(), {'SoortLid':soortlidId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addSoortLid: function (soortlidData) {
           userService.get().then(function(res){
                mySoortLid.fromObject({Bedrijf : res.Bedrijf,SoortLid : soortlidData.SoortLid, Omschrijving : soortlidData.Omschrijving});
                Service.SvcSoortLid("C", res.Username, mySoortLid);
            });

        },
        updateSoortLid:function(soortlidData){
           userService.get().then(function(res){
                mySoortLid.fromObject({Bedrijf : res.Bedrijf,SoortLid : soortlidData.SoortLid, Omschrijving : soortlidData.Omschrijving});
                Service.SvcSoortLid("U", res.Username, mySoortLid);
            });
        },

        delSoortLid: function(SoortLid,Omschrijving){

            var delSoortLidPromise = $q.defer();

            userService.get().then(function(res){
                mySoortLid.fromObject({Bedrijf : res.Bedrijf,SoortLid : SoortLid, Omschrijving : Omschrijving});
                Service.SvcSoortLid("D", res.Username, mySoortLid, function(result){
                    console.log(result);

                    delSoortLidPromise.resolve(result)
                });
            });

            return delSoortLidPromise.promise;



          // _.remove($rootScope.soortlid,function(soortlids){
          //   return soortlids.soortlid===soortlidId;
          // });
        },
        nextSoortLid:function(soortlidId, cb){
          var index=_.findIndex($rootScope.soortlid, function(soortlids){
            return soortlids.SoortLid===soortlidId;
          });
          if(index===-1 || index+1 >= $rootScope.soortlid.length){
           // return cb();
           return cb($rootScope.soortlid[0]);
          }
          return cb($rootScope.soortlid[index+1]);
        },
        preSoortLid:function(soortlidId, cb){
          var index=_.findIndex($rootScope.soortlid, function(soortlids){
            return soortlids.SoortLid===soortlidId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.soortlid[0]);
          }
          return cb($rootScope.soortlid[index-1]);
        }
      };
    }]);
