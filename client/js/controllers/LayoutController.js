'use strict';

angular.module('app').controller('LayoutController', function ($scope, $http, IdentityService, Notifier, AuthService) {

  $scope.identity = IdentityService;

  $scope.signin = function(username,password) {
    AuthService.authenticateUser(username, password).then(function(success) {
      if(success) {
        Notifier.notify('You have successfully logged in');
      }
      else {
        Notifier.notify('Login unsuccessful');
      }
    });
  };


});