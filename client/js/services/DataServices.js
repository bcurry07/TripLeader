
//angular resource service to aid in back-end calls to api

angular.module('app').factory('TripLeaderData', function($resource) {
  return $resource('/api/tripLeaders/:_id', {_id: "@id"}, {
    update: {method:'PUT', isArray:false}
  });
});

angular.module('app').factory('PaymentData', function($resource) {
  return $resource('/api/payments/:_id', {_id: "@id"}, {
    update: {method:'PUT', isArray:false}
  });
});

angular.module('app').factory('TripData', function($resource) {
  return $resource('/api/trips/:_id', {_id: "@id"}, {
    update: {method:'PUT', isArray:false}
  });
});

angular.module('app').factory('TravelerData', function($resource) {
  return $resource('/api/travelers/:_id', {_id: "@id"}, {
    update: {method:'PUT', isArray:false}
  });
});