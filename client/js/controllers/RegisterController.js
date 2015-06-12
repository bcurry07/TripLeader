angular.module('app').controller('RegisterController', function ($scope, $location, TripData, IdentityService) {

  var registerController = this;


  registerController.returnToHome = returnToHome;
  registerController.createTrip = createTrip;

  activate();

  function activate() {
    if($location.path().split('/')[1] === 'editTrip') {
      registerController.editForm = true;
      registerController.trip = IdentityService.currentTrip;
    }
    else if($location.path().split('/')[1] === 'register') {
      registerController.trip = {};
      registerController.editForm = false;
    }
  }

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