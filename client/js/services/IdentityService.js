angular.module('app').factory('IdentityService', function() {
  return {
    currentUser: undefined,
    isAuthenticated: function() {
      return !!this.currentUser;
    }
  }
});