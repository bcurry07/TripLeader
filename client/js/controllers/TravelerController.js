angular.module('app').controller('TravelerController', function (IdentityService, TravelerData, $location) {

  var travelerController = this;

  travelerController.trip = IdentityService.currentTrip;
  travelerController.products = [];
  travelerController.purchases = [];
  travelerController.cartTotalCost = 0;
  travelerController.addTraveler = addTraveler;
  travelerController.check = check;

  activate();

  function activate() {
    for(var property in travelerController.trip.prices) {
      travelerController.products.push({'item':property, 'cost':travelerController.trip.prices[property]});
    }
  }

  function addTraveler(traveler) {

    var newTraveler = new TravelerData(traveler);
    newTraveler._trip = travelerController.trip._id;

    TravelerData.save(newTraveler, function(response) {

      alert('Traveler successfully added');
      $location.url('/tripHome');

    },function(error) {
      console.log(error);
      alert('Traveler could not be added');
    });
  }

  function check(product) {
    travelerController.purchases.push(product);
    travelerController.cartTotalCost += product.cost;
  }

});