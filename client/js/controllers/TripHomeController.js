angular.module('app').controller('TripHomeController', function (IdentityService) {

  var tripHomeController = this;

  tripHomeController.tripName = IdentityService.currentTrip.name;

});