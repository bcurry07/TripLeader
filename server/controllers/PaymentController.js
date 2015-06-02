'use strict';

// Import dependencies
var _s = require('underscore.string');
var ErrorResponse = require('../utilities/ErrorResponse');
var PaymentsService = require('../services/PaymentService');

/**
 * Controller responsible for handling RESTful interactions involving Payments
 */
module.exports = function(router) {

  /**
   * Returns a list of payments
   */
  router.get('/payments', function(request, response) {
    PaymentsService.list({}, function(payments) {
      response.send(payments);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to list payments.');
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Returns a single payment with the specified id
   */
  router.get('/payments/:id', function(request, response) {
    // Pull request data
    var id = request.params.id;
    // Find payment by id
    PaymentsService.findById(id, function(payment) {
      response.send(payment);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to find the payment w/ id "%s".', id);
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Saves a payment
   */
  router.post('/payments', function(request, response) {
    // Pull request data
    var payment = request.body;
    // Save payment
    PaymentsService.save(payment, function(savedPayment) {
      response.send(savedPayment);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to save that payment.');
      ErrorResponse.send(response, 500, message, error);
    });
  });

  /**
   * Deletes a single payment with the specified id
   */
  router.delete('/payments/:id', function(request, response) {
    // Pull request data
    var id = request.params.id;
    // Find payment by id
    PaymentsService.deleteById(id, function(payment) {
      response.send(payment);
    }, function(error) {
      var message = _s.sprintf('An error occured while trying to delete the payment w/ id "%s".', id);
      ErrorResponse.send(response, 500, message, error);
    });
  });

};
