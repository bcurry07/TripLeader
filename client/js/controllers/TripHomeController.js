angular.module('app').controller('TripHomeController', function (IdentityService) {

  var tripHomeController = this;

  tripHomeController.gridOptions = {};

  tripHomeController.myData = [{name: "Moroni", age: 50},
    {name: "Tiancum", age: 43},
    {name: "Jacob", age: 27},
    {name: "Nephi", age: 29},
    {name: "Enos", age: 34}];
  tripHomeController.gridOptions = { data: 'tripHomeController.myData' };

  tripHomeController.tripName = IdentityService.currentTrip.name;

});