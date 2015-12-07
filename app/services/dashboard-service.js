angular.module('poldersite')
  .factory('DashBoard',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
      var lastId="";
      var myDashBoard = new TDashBoard();
      var myGraph1 = new TGraph1();
      var myGraph2 = new TGraph2();
      return {
//      getDashBoard: function () {
        findAll: function () {
            var defer = $q.defer();
             userService.get().then(function(res){
               myDashBoard.fromObject({Bedrijf : res.Bedrijf
			                         , Aantal : 0
			                         , Bedrag : 0
			                         , Omschrijving : ''
			                         , Periode : 0
			                         , Vlag1 : false
			                         , Vlag2 : false
			                         , Vlag3 : false
			                         , Vlag4 : false
									 });
               Service.SvcDashBoard("R", res.Username, myDashBoard, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(result.toObject()));
               });
            });
            return defer.promise;
        },

        getGraph1: function () {
            var defer = $q.defer();
             userService.get().then(function(res){
             myGraph1.fromObject({
                Bedrijf : res.Bedrijf,
                Column1 : 0,
                Column2 : 0
             });

             Service.SvcGraph1("R", res.Username, myGraph1, function(result) {
                defer.resolve(result.toObject());
             });
            });
            return defer.promise;
        },

        getGraph2: function () {
            var defer = $q.defer();
             userService.get().then(function(res){
             myGraph2.fromObject({
                Bedrijf : res.Bedrijf,
                Column1 : 0,
                Column2 : 0
             });

             Service.SvcGraph2("R", res.Username, myGraph2, function(result) {
                defer.resolve(result.toObject());
             });
            });
            return defer.promise;
        }

      };
    }]);
