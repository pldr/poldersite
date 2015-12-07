angular.module('poldersite')
  .factory('Persoon',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
 	  var lastId="";
      var myPersoon = new TPersoon();
      return {
	  findAll: function () {
			$rootScope.display.persoonLidNr=true; //20150801
			$rootScope.display.persoonNaam=true;
			$rootScope.display.persoonStraat=true;
			$rootScope.display.persoonHuisNr=true;
			$rootScope.display.persoonPostcode=true;
			$rootScope.display.persoonPlaats=true;
			$rootScope.display.persoonDatumGeb=true;
			$rootScope.display.persoonLeeftijd=true;
			var defer = $q.defer();
            userService.get().then(function(res){
                myPersoon.fromObject({Bedrijf : res.Bedrijf
					, Persoon : ''
					, Aanhef : '', AanhefOms : '', AantalTermijnen : 0, BankRekNr : '', Bedrag : 0, BedragBetaald : 0, BedragOpenstaand : 0, BetaalWijze : ''
					, DatumEind : '1899-12-30T00:00:00', DatumGeb : '1899-12-30T00:00:00', DatumInschr : '1899-12-30T00:00:00', DatumInvoer : '1899-12-30T00:00:00', DatumMutatie : '1899-12-30T00:00:00'
					, DatumOndertekening : '1899-12-30T00:00:00', Email : '', Email2 : '', Geslacht : '', Groep : '', Groepen : '', GroepOms : '', HfdBew : '', Hoofdbewoner : false, HuisNr : '', HuisNrAanv : ''
					, IncassoUitgevoerd : false, KodeExtern : '', Land : '', Leeftijd : 0, LidNr : 0, MachtigingsID : '', MailingList : false, Medebewoners : false, Naam : '', Naam_2 : '', Opmerking : '', Plaats : ''
					, Postcode : '', RedenEind : '', RedenInschrijving : '', Regio : '', RegioOms : '', SofiNr : 0, SoortLid : '', SoortLidOms : '', Straat : '', StraatAanv : '', TelNr : '', TelNrMobiel : '', TelNrWerk : ''
					, Titel : '', Tussenvoegsel : '', Vlag1 : false, Vlag10 : false, Vlag11 : false, Vlag12 : false, Vlag13 : false, Vlag14 : false, Vlag15 : false, Vlag16 : false, Vlag2 : false, Vlag3 : false
					, Vlag4 : false, Vlag5 : false, Vlag6 : false, Vlag7 : false, Vlag8 : false, Vlag9 : false, Voorletters : '', Voornaam : ''
				});
                Service.SvcPersoon("R", res.Username, myPersoon, function(result) {
                    defer.resolve(result.toObject());
				});
			});
			return defer.promise;
        },

//Problem :
// 1) Date is displayed as datetime
// 2) Date are displayed 1 day earlier
//console.log(JSON.stringify(result.toObject()[1].DatumGeb.toLocaleDateString('nl-NL')));
//console.log(JSON.stringify(result.toObject()[1].DatumGeb));
//console.log(JSON.stringify(result.toObject()[1].DatumGeb.setHours(0)));
//console.log(JSON.stringify(result.toObject()[1].DatumGeb.toUTCString()));
//console.log(JSON.stringify(result.toObject()[1].DatumGeb.toGMTString()));
//nextday=new Date(result.toObject()[1].DatumGeb.getFullYear(),result.toObject()[1].DatumGeb.getMonth(),result.toObject()[1].DatumGeb.getDate()+1);
//console.log('Datum ' + nextday.toLocaleDateString('nl-NL'));
//console.log(datumgeb.setHours(0));
//result.toObject()[1].DatumGeb=result.toObject()[1].DatumGeb.toLocaleDateString('nl-NL');
//console.log(JSON.stringify(result.toObject()[1].DatumGeb));

        getPersoon: function (persoonId) {
            var defer = $q.defer();
		    //console.log('Lidnr2  : ' + persoonId);
			userService.get().then(function(res){
				// myPersoon.fromObject({Bedrijf : res.Bedrijf,Persoon : '', Naam : ''});
				// console.log('Bedrijf : ' + res.Bedrijf);
				// specify all input-fields, maybe used in future
				myPersoon.fromObject({Bedrijf : res.Bedrijf //, Persoon : ''
					, Aanhef : '', AanhefOms : '', AantalTermijnen : 0, BankRekNr : '', Bedrag : 0, BedragBetaald : 0, BedragOpenstaand : 0, BetaalWijze : ''
					, DatumEind : '1899-12-30T00:00:00', DatumGeb : '1899-12-30T00:00:00', DatumInschr : '1899-12-30T00:00:00', DatumInvoer : '1899-12-30T00:00:00', DatumMutatie : '1899-12-30T00:00:00'
					, DatumOndertekening : '1899-12-30T00:00:00', Email : '', Email2 : '', Geslacht : '', Groep : '', Groepen : '', GroepOms : '', HfdBew : '', Hoofdbewoner : false, HuisNr : '', HuisNrAanv : ''
					, IncassoUitgevoerd : false, KodeExtern : '', Land : '', Leeftijd : 0
					, LidNr : 0 //persoonId
					, MachtigingsID : '', MailingList : false, Medebewoners : false, Naam : '', Naam_2 : '', Opmerking : '', Plaats : ''
					, Postcode : '', RedenEind : '', RedenInschrijving : '', Regio : '', RegioOms : '', SofiNr : 0, SoortLid : '', SoortLidOms : '', Straat : '', StraatAanv : '', TelNr : '', TelNrMobiel : '', TelNrWerk : ''
					, Titel : '', Tussenvoegsel : '', Vlag1 : false, Vlag10 : false, Vlag11 : false, Vlag12 : false, Vlag13 : false, Vlag14 : false, Vlag15 : false, Vlag16 : false, Vlag2 : false, Vlag3 : false
					, Vlag4 : false, Vlag5 : false, Vlag6 : false, Vlag7 : false, Vlag8 : false, Vlag9 : false, Voorletters : '', Voornaam : ''
				});
            Service.SvcPersoon("R", res.Username, myPersoon, function(result) {
				var data = _.find(result.toObject(), {'LidNr': parseInt(persoonId)});
                //when only first row returns, then no prev/next possible
				//var data = result.toObject()[0];
				//don't log, defer won't work anymore
				//console.log('svcPersoon : ' + JSON.stringify(data[0].LidNr) + ' ' + JSON.stringify(data[0].Naam) );
                defer.resolve(data);
			  });
            });
            return defer.promise;
        },

        addPersoon: function (persoonData) {
           userService.get().then(function(res){
//                myPersoon.fromObject({Bedrijf : res.Bedrijf,Persoon : Persoon, Naam : Naam});
                myPersoon.fromObject({Bedrijf : res.Bedrijf //, Persoon : ''
					, Aanhef : ''
					, AanhefOms : ''
					, AantalTermijnen : 0
					, BankRekNr : ''
					, Bedrag : 0
					, BedragBetaald : 0
					, BedragOpenstaand : 0
					, BetaalWijze : ''
					, DatumEind : '1899-12-30T00:00:00'
					, DatumGeb : '1899-12-30T00:00:00'
					, DatumInschr : '1899-12-30T00:00:00'
					, DatumInvoer : '1899-12-30T00:00:00'
					, DatumMutatie : '1899-12-30T00:00:00'
					, DatumOndertekening : '1899-12-30T00:00:00'
					, Email : ''
					, Email2 : ''
					, Geslacht : ''
					, Groep : ''
					, Groepen : ''
					, GroepOms : ''
					, HfdBew : ''
					, Hoofdbewoner : false
					, HuisNr : ''
					, HuisNrAanv : ''
					, IncassoUitgevoerd : false
					, KodeExtern : ''
					, Land : ''
					, Leeftijd : 0
					, LidNr : persoonData.LidNr
					, MachtigingsID : ''
					, MailingList : false
					, Medebewoners : false
					, Naam : persoonData.Naam
					, Naam_2 : ''
					, Opmerking : ''
					, Plaats : ''
					, Postcode : ''
					, RedenEind : ''
					, RedenInschrijving : ''
					, Regio : ''
					, RegioOms : ''
					, SofiNr : 0
					, SoortLid : ''
					, SoortLidOms : ''
					, Straat : ''
					, StraatAanv : ''
					, TelNr : ''
					, TelNrMobiel : ''
					, TelNrWerk : ''
					, Titel : ''
					, Tussenvoegsel : ''
					, Vlag1 : false, Vlag10 : false, Vlag11 : false, Vlag12 : false, Vlag13 : false, Vlag14 : false, Vlag15 : false, Vlag16 : false
					, Vlag2 : false, Vlag3 : false, Vlag4 : false, Vlag5 : false, Vlag6 : false, Vlag7 : false, Vlag8 : false, Vlag9 : false
					, Voorletters : ''
					, Voornaam : ''
				});
				//console.log('svcPersoon : ' + JSON.stringify(myPersoon));
                Service.SvcPersoon("C", res.Username, myPersoon);
            });
        },

        updatePersoon:function(Persoon){
          userService.get().then(function(res){
            Service.SvcPersoon("U", res.Username, Persoon);
          });
        },

        delPersoon:function(Persoon){
          userService.get().then(function(res){
			Service.SvcPersoon("D", res.Username, Persoon);
          });
        },

        prePersoon:function(lidnr, cb){
          var index=_.findIndex( $rootScope.pers, function(pers){
            return pers.LidNr===lidnr;
          });
          if(index===-1 || index+1 >= $rootScope.pers.length){ //return cb();
            return cb($rootScope.pers[0]);
          }
          return cb($rootScope.pers[index+1]);
        },

        nextPersoon:function(lidnr, cb){
          var index=_.findIndex($rootScope.pers, function(pers){
            return pers.LidNr===lidnr;
          });
          if(index===-1 || index===0){ //return cb();
            return cb($rootScope.pers[0]);
          }
          return cb($rootScope.pers[index-1]);
        }

      };
    }]);
