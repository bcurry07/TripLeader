'use strict';

angular.module('app').controller('LayoutController', function ($scope, $http, $location, IdentityService, Notifier, AuthService, TripData) {

  var layoutController = this;

  layoutController.identity = IdentityService;
  layoutController.signin = signin;
  layoutController.signout = signout;
  layoutController.tripDestination = "";
  layoutController.tripPassword = "";

  activate();

  function activate() {
    var tripLoginNames = [];
    TripData.query().$promise.then(function(trips) {
      trips.forEach(function(trip) {
        tripLoginNames.push(trip.loginId);
      });
      layoutController.tripNames = tripLoginNames;
      console.log(layoutController.tripNames);
    });
  }

  function signin(tripDestination,tripPassword) {
    AuthService.authenticateUser(tripDestination, tripPassword).then(function(success) {
      if(success) {
        Notifier.notify('You have successfully logged in');
        $location.url('/tripHome'); /* + layoutController.identity.currentTrip._id);*/
      }
      else {
        Notifier.notify('Login unsuccessful');
      }
    });
  }

  function signout() {
    AuthService.logoutUser().then(function() {
      layoutController.tripDestination = "";
      layoutController.tripPassword = "";
      Notifier.notify("You have successfully logged out!");
      $location.url('/');
    });
  }


});