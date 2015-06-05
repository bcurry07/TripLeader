angular.module('app').controller('RegisterController', function ($scope, $location, TripData) {

    $scope.trip = {};

  $scope.returnToHome = function() {
    $location.url('/');
  };

    $scope.createTrip = function(trip) {

      var newTrip = new TripData(trip);

      TripData.save(newTrip, function(response) {

        alert('Trip successfully added');
        $location.url('/');

      },function(error) {
        console.log(error);
        alert('Trip could not be added');
      });
    };

});