angular.module('app').controller('LoginController', function ($scope, $location, TripLeaderData, LoginService) {



  $scope.tripLeader = {};

  $scope.returnToHome = function() {
    $location.url('/');
  };

  $scope.validateLogin = function(tripLeader) {
    var validated = false;

    TripLeaderData.query().$promise.then(function (tripLeaders) {
      tripLeaders.forEach(function(leader) {
        if((leader.name === tripLeader.name) && (leader.password === tripLeader.password)) {
          validated = true;
          return;
        }
      });
      if(validated) {
        LoginService.loggedInUser = tripLeader.name;
        alert('Login successful!');
        $location.url('/');
      }
      else {
        alert('Login unsuccessful');
      }
    });
  };

});