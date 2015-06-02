'use strict';

// Import dependencies
var _s = require('underscore.string');
var ErrorResponse = require('../utilities/ErrorResponse');
var TripLeaderService = require('../services/TripLeaderService');

/**
 * Controller responsible for handling RESTful interactions involving TripLeader
 */
module.exports = function(router) {

  /**
   * Returns a list of tripLeaders
   */
  router.get('/tripLeaders', function(request, response) {
    TripLeaderService.list({}, function(tripLeaders) {
      response.send(tripLeaders);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to list tripLeaders.');
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Returns a single tripLeader with the specified id
   */
  router.get('/tripLeaders/:id', function(request, response) {
    // Pull request data
    var id = request.params.id;
    // Find tripLeader by id
    TripLeaderService.findById(id, function(tripLeader) {
      response.send(tripLeader);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to find the tripLeader w/ id "%s".', id);
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Saves a tripLeader
   */
  router.post('/tripLeaders', function(request, response) {
    // Pull request data
    var tripLeader = request.body;
    console.log(tripLeader);
    // Save tripLeader
    TripLeaderService.save(tripLeader, function(savedTripLeader) {
      response.send(savedTripLeader);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to save that tripLeader.');
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Deletes a single tripLeader with the specified id
   */
  router.delete('/tripLeaders/:id', function(request, response) {
    // Pull request data
    var id = request.params.id;
    // Find tripLeader by id
    TripLeaderService.deleteById(id, function(tripLeader) {
      response.send(tripLeader);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to delete the tripLeader w/ id "%s".', id);
      ErrorResponse.send(response, 500, message, error);
    });
  });

};
