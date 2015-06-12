'use strict';

// Import dependencies
var _s = require('underscore.string');
var ErrorResponse = require('../utilities/ErrorResponse');
var TravelersService = require('../services/TravelerService');

/**
 * Controller responsible for handling RESTful interactions involving Travelers
 */
module.exports = function(router) {

  /**
   * Returns a list of travelers
   */
  router.get('/travelers', function(request, response) {
    TravelersService.list({}, function(travelers) {
      response.send(travelers);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to list travelers.');
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Returns a single traveler with the specified id
   */
  router.get('/travelers/:id', function(request, response) {
    // Pull request data
    var id = request.params.id;
    // Find traveler by id
    TravelersService.findById(id, function(traveler) {
      response.send(traveler);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to find the traveler w/ id "%s".', id);
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Saves a traveler
   */
  router.post('/travelers', function(request, response) {
    // Pull request data
    var traveler = request.body;
    // Save traveler
    TravelersService.save(traveler, function(savedTraveler) {
      response.send(savedTraveler);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to save that traveler.');
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Deletes a single traveler with the specified id
   */
  router.delete('/travelers/:id', function(request, response) {
    // Pull request data
    var id = request.params.id;
    // Find traveler by id
    TravelersService.deleteById(id, function(traveler) {
      response.send(traveler);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to delete the traveler w/ id "%s".', id);
      ErrorResponse.send(response, 500, message, error);
    });
  });

};
