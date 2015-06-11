angular.module('app').controller('EditTripController', function (IdentityService) {

  var editTripController = this;

  editTripController.trip = IdentityService.currentTrip;

});