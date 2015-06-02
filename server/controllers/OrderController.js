'use strict';

// Import dependencies
var _s = require('underscore.string');
var ErrorResponse = require('../utilities/ErrorResponse');
var OrdersService = require('../services/OrderService');

/**
 * Controller responsible for handling RESTful interactions involving Orders
 */
module.exports = function(router) {

  /**
   * Returns a list of orders
   */
  router.get('/orders', function(request, response) {
    OrdersService.list({}, function(orders) {
      response.send(orders);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to list orders.');
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Returns a single order with the specified id
   */
  router.get('/orders/:id', function(request, response) {
    // Pull request data
    var id = request.params.id;
    // Find order by id
    OrdersService.findById(id, function(order) {
      response.send(order);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to find the order w/ id "%s".', id);
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Saves a order
   */
  router.post('/orders', function(request, response) {
    // Pull request data
    var order = request.body;
    // Save order
    OrdersService.save(order, function(savedOrder) {
      response.send(savedOrder);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to save that order.');
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Deletes a single order with the specified id
   */
  router.delete('/orders/:id', function(request, response) {
    // Pull request data
    var id = request.params.id;
    // Find order by id
    OrdersService.deleteById(id, function(order) {
      response.send(order);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to delete the order w/ id "%s".', id);
      ErrorResponse.send(response, 500, message, error);
    });
  });

};
