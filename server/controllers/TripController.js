'use strict';

// Import dependencies
var _s = require('underscore.string');
var ErrorResponse = require('../utilities/ErrorResponse');
var TripsService = require('../services/TripService');
var auth = require('../utilities/Auth');

/**
 * Controller responsible for handling RESTful interactions involving Trips
 */
module.exports = function(router) {

  var login = {
    username: process.env.LOGINUSER,
    password: process.env.LOGINPW
  };


  /**
   * Returns a list of trips
   */
  router.get('/trips', function(request, response) {
    TripsService.list({}, function(trips) {
      response.send(trips);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to list trips.');
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Returns a single trip with the specified id
   */
  router.get('/trips/:id', function(request, response) {
    // Pull request data
    var id = request.params.id;
    // Find trip by id
    TripsService.findById(id, function(trip) {
      response.send(trip);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to find the trip w/ id "%s".', id);
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Saves a trip
   */
  router.post('/trips', auth.basicAuth(login.username, login.password), function(request, response) {
    // Pull request data
    var trip = request.body;
    // Save trip
    TripsService.save(trip, function(savedTrip) {
      response.send(savedTrip);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to save that trip.');
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Deletes a single trip with the specified id
   */
  router.delete('/trips/:id', auth.basicAuth(login.username, login.password), function(request, response) {
    // Pull request data
    var id = request.params.id;
    // Find trip by id
    TripsService.deleteById(id, function(trip) {
      response.send(trip);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to delete the trip w/ id "%s".', id);
      ErrorResponse.send(response, 500, message, error);
    });
  });

};
