'use strict';

/**
 * @ngdoc overview
 * @name interviewDatabaseWebApp
 * @description
 * # interviewDatabaseWebApp
 *
 * Main module of the application.
 */
angular.module('app', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngCookies',
  'ngGrid',
  'ui.bootstrap'
]).config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $routeProvider
    .when('/main', {
      templateUrl: 'views/main.html',
      controller: 'MainController',
      controllerAs: 'mainController'
    })
    .when('/register', {
      templateUrl: 'views/TripForm.html',
      controller: 'RegisterController',
      controllerAs: 'registerController'
    })
    .when('/editTrip', {
      templateUrl: 'views/TripForm.html',
      controller: 'RegisterController',
      controllerAs: 'registerController'
    })
    .when('/addTraveler', {
      templateUrl: 'views/TravelerForm.html',
      controller: 'TravelerController',
      controllerAs: 'travelerController'
    })
    .when('/tripHome', {
      templateUrl: 'views/TripHome.html',
      controller: 'TripHomeController',
      controllerAs: 'tripHomeController'
    })
    .otherwise({
      templateUrl: 'views/main.html',
      controller: 'MainController'
    });

}).constant('$', window.jQuery);