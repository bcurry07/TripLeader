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
  'ngCookies'
]).config(function ($routeProvider) {
  $routeProvider
    .when('/main', {
      templateUrl: 'views/main.html',
      controller: 'MainController'
    })
    .when('/register', {
      templateUrl: 'views/registerTrip.html',
      controller: 'RegisterController'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .otherwise({
      templateUrl: 'views/main.html',
      controller: 'MainController'
    });
}).constant('$', window.jQuery);