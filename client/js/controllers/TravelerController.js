angular.module('app').controller('TravelerController', function (IdentityService) {

  var travelerController = this;

  travelerController.trip = IdentityService.currentTrip;

});