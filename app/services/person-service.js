angular.module('poldersite')
  .factory('Person', [
    'GLOBALS', '$http', '$rootScope',
    function (GLOBALS, $http, $rootScope) {
      var lastId=0;
      return {

		getPersons: function () {
          return $http({method: 'GET', url: GLOBALS.personUrl}).then(function (res) {
            $rootScope.persons = res.data.result.Result;
            var lastPerson=_.last(res.data.result.Result);
            if(lastPerson.id){
              lastId=lastPerson.id;
            }
            return res.data.result.Result;
          });
        },

        getPerson: function (id) {
		// console.log('getperson ' + id);
		  return _.find($rootScope.persons,{'id':parseInt(id)});
        },

        addPerson: function (person) {
          lastId = person.id=parseInt(lastId)+1;
          person.age=parseInt(person.age);
          $rootScope.persons.push(person);
        },

        updatePerson:function(id, person){
          _.forEach($rootScope.persons, function(item){
            if(parseInt(item.id)===parseInt(id)){
              item=_.merge(item,person);
            }
          });
        },

        delPerson:function(id){
          _.remove($rootScope.persons,function(person){
            return person.id===parseInt(id);
          });
        },

        nextPerson:function(id, cb){
          var index=_.findIndex($rootScope.persons, function(person){
            return person.id===parseInt(id);
          });
          if(index===-1 || index+1>=$rootScope.persons.length){
          return cb($rootScope.persons[0]);
           // return cb();
          }
            return cb($rootScope.persons[index+1]);

        },

        prePerson:function(id, cb){
          var index=_.findIndex($rootScope.persons, function(person){
            return person.id===parseInt(id);
          });
          if(index===-1 || index===0){
            return cb($rootScope.persons[0]);
            //return cb();
          }

          return cb($rootScope.persons[index-1]);
        }
      };
    }]);
