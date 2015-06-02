'use strict';

angular.module('app').controller('LayoutController', function ($scope, LoginService) {

  $scope.loggedIn = !!LoginService.loggedInUser;

//  var initialize = function() {
//
//  };
//
//  initialize();

});