'use strict';

angular.module('app').controller('LayoutController', function ($scope, $http, $location, IdentityService, Notifier, AuthService) {

  var layoutController = this;

  layoutController.identity = IdentityService;
  layoutController.signin = signin;
  layoutController.signout = signout;


  function signin(username,password) {
    AuthService.authenticateUser(username, password).then(function(success) {
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
      layoutController.username = "";
      layoutController.password = "";
      Notifier.notify("You have successfully logged out!");
      $location.url('/');
    });
  }


});