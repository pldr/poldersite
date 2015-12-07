angular.module('poldersite')
//20151005  .controller('PersoonController',
  .controller('DashBoardController',
    function ($rootScope, $scope, $state, DashBoard, dashboards, bedrijf, username, authService) {

       var model = {
           selection : [],
           dashboards: dashboards
       };

       DashBoard.getGraph1().then(function(data) {
        $scope.graph1data = [];
        $scope.graph1data.push(_.map(data, _.iteratee('Column2')).splice(0,15));
        $scope.graph1labels = _.map(data, _.iteratee('Column1')).splice(0,15);
        $scope.graph1data[0].reverse();
        $scope.graph1labels.reverse();
       });

       DashBoard.getGraph2().then(function(data) {
        $scope.graph2data = [];
        $scope.graph2data.push(_.map(data, _.iteratee('Column2')).splice(0,15));
        $scope.graph2labels = _.map(data, _.iteratee('Column1')).splice(0,15);
        $scope.graph2data[0].reverse();
        $scope.graph2labels.reverse();
       });

       $scope.bedrijf = bedrijf;
       $scope.username = username;

      angular.extend(this,{
          model: model,
          dashboardService: DashBoard
      })

    });
