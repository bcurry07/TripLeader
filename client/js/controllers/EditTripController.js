angular.module('app').controller('EditTripController', function (IdentityService) {

  var editTripController = this;

  editTripController.trip = IdentityService.currentTrip;
  console.log(editTripController.trip);
  editTripController.editForm = true;

});