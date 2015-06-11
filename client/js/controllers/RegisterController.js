angular.module('app').controller('RegisterController', function ($scope, $location, TripData) {

  var registerController = this;

  registerController.trip = {};
  registerController.returnToHome = returnToHome;
  registerController.createTrip = createTrip;

 function returnToHome() {
    $location.url('/');
  }

   function createTrip(trip) {

      var newTrip = new TripData(trip);

      TripData.save(newTrip, function(response) {

        alert('Trip successfully added');
        $location.url('/');

      },function(error) {
        console.log(error);
        alert('Trip could not be added');
      });
    }

});