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
  'ngTouch'
]).config(function ($routeProvider) {
  $routeProvider
    .when('/main', {
      templateUrl: 'views/main.html',
      controller: 'MainController'
    })
    .otherwise({
      templateUrl: 'views/main.html',
      controller: 'MainController'
    });
}).constant('$', window.jQuery);