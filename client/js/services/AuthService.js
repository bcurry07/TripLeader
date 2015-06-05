angular.module('app').factory('AuthService', function($http, IdentityService, $q) {
  return {
    authenticateUser: function(username, password) {
      var deferred = $q.defer();

      $http.post('/login', {username:username, password:password}).then(function(response) {
        if(response.data.success) {

          IdentityService.currentUser = response.data.user;
          //localStorage.setItem('user', response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
//          var test = localStorage.getItem('user');
//          console.log(test);
          deferred.resolve(true);
        }
        else {
          deferred.resolve(false);
        }
      });

      return deferred.promise;
    },
    logoutUser: function() {
      var deferred = $q.defer();
      $http.post('/logout', {logout:true}).then(function() {
        IdentityService.currentUser = undefined;
        //localStorage.setItem('user', null);
        localStorage.removeItem('user');
        deferred.resolve();
      });
      return deferred.promise;
    }
  }
});