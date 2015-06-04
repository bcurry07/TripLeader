angular.module('app').factory('AuthService', function($http, IdentityService, $q) {
  return {
    authenticateUser: function(username, password) {
      var deferred = $q.defer();

      $http.post('/login', {username:username, password:password}).then(function(response) {
        if(response.data.success) {
          IdentityService.currentUser = response.data.user.name;
          deferred.resolve(true);
        }
        else {
          deferred.resolve(false);
        }
      });

      return deferred.promise;
    }
  }
});