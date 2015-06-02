angular.module('app').controller('RegisterController', function ($scope, $location, TripLeaderData) {

    $scope.tripLeader = {};

  $scope.returnToHome = function() {
    $location.url('/');
  };

    $scope.createTripLeader = function(tripLeader) {

      var newTripLeader = new TripLeaderData(tripLeader);
      //newTripLeader = tripLeader;

      TripLeaderData.save(newTripLeader, function(response) {

        alert('Trip Leader successfully added');
        $location.url('/');

      },function(error) {
        console.log(error);
        alert('Trip Leader could not be added');
      });
    };

});