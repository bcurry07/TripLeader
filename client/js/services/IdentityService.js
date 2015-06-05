angular.module('app').factory('IdentityService', function() {

  var currentUser;

  if(localStorage.getItem('user')) {
    currentUser = JSON.parse(localStorage.getItem('user'));
  }

  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    }
  }
});