angular.module('app').factory('IdentityService', function() {

  var currentTrip;
  if(localStorage.getItem('trip')) {
    currentTrip = JSON.parse(localStorage.getItem('trip'));
  }

  return {
    currentTrip: currentTrip,
    isAuthenticated: function() {
      return !!this.currentTrip;
    }
  }
});