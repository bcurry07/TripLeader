'use strict';

// Import dependencies
var _ = require('underscore');
var Params = require('../utilities/Params');
var Payment = require('../models/Payment');

/**
 * Service responsible for handling interactions involving Payments
 */
module.exports = function() {

  /**
   * Returns a list of payments that match the supplied criteria
   *
   * @param {object} criteria
   * @param {function} onSuccess - Happy path callback whose signature matches "function(payments)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var list = function(criteria, onSuccess, onFailure) {
    // Sanitize params
    Params.required('criteria', criteria, 'object').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // List payments
    Payment.find(criteria, function(error, payments) {
      if(!error) {
        onSuccess(payments);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Finds a payment w/ the supplied id
   *
   * @param {string} id
   * @param {function} onSuccess - Happy path callback whose signature matches "function(payment)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var findById = function(id, onSuccess, onFailure) {
    // Sanitize params
    Params.required('id', id, 'string').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Find payment
    Payment.findById(id, function(error, payment) {
      if(!error) {
        onSuccess(payment);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Saves the supplied payment
   *
   * @param {object} payment
   * @param {function} onSuccess - Happy path callback whose signature matches "function(payment)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var save = function(payment, onSuccess, onFailure) {
    // Sanitize params
    Params.required('payment', payment, 'object');
    // Save payment
    if(payment._id) {
      update(payment, onSuccess, onFailure);
    }
    else {
      create(payment, onSuccess, onFailure);
    }
  };

  /**
   * Deletes the payment w/ the supplied id
   *
   * @param {string} id
   * @param {function} onSuccess - Happy path callback whose signature matches "function(payment)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var deleteById = function(id, onSuccess, onFailure) {
    // Sanitize params
    Params.required('id', id, 'string').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Delete payment
    Payment.findByIdAndRemove(id, function(error, payment) {
      if(!error) {
        onSuccess(payment);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Creates the supplied payment
   *
   * @param {object} payment
   * @param {function} onSuccess - Happy path callback whose signature matches "function(payment)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var create = function(payment, onSuccess, onFailure) {
    // Sanitize params
    Params.required('payment', payment, 'object').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Create payment
    new Payment(payment).save(function(error, savedPayment) {
      if(!error) {
        onSuccess(savedPayment);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Updates the supplied payment
   *
   * @param {object} payment
   * @param {function} onSuccess - Happy path callback whose signature matches "function(payment)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var update = function(payment, onSuccess, onFailure) {
    // Sanitize params
    Params.required('payment', payment, 'object');
    var onFailure = onFailure || _.noop;
    // Update payment
    Payment.findByIdAndUpdate(payment._id, {
      $set: payment
    }, function(error) {
      if(!error) {
        findById(payment._id, onSuccess, onFailure);
      }
      else {
        onFailure(error);
      }
    });
  };

  // Public API
  return {
    list: list,
    findById: findById,
    save: save,
    deleteById: deleteById
  };

}();