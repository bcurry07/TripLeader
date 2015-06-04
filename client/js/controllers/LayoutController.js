'use strict';

angular.module('app').controller('LayoutController', function ($scope, $http) {

  $scope.signin = function(username,password) {
    $http.post('/login', {username:username, password:password}).then(function(response) {
      if(response.data.success) {
        console.log('logged in!');
      }
      else {
        console.log('login failed');
      }
    });
  };

//  var initialize = function() {
//
//  };
//
//  initialize();

});