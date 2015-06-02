'use strict';

// Import dependencies
var _ = require('underscore');
var Params = require('../utilities/Params');
var Order = require('../models/Order');

/**
 * Service responsible for handling interactions involving Orders
 */
module.exports = function() {

  /**
   * Returns a list of orders that match the supplied criteria
   *
   * @param {object} criteria
   * @param {function} onSuccess - Happy path callback whose signature matches "function(orders)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var list = function(criteria, onSuccess, onFailure) {
    // Sanitize params
    Params.required('criteria', criteria, 'object').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // List orders
    Order.find(criteria, function(error, orders) {
      if(!error) {
        onSuccess(orders);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Finds a order w/ the supplied id
   *
   * @param {string} id
   * @param {function} onSuccess - Happy path callback whose signature matches "function(order)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var findById = function(id, onSuccess, onFailure) {
    // Sanitize params
    Params.required('id', id, 'string').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Find order
    Order.findById(id, function(error, order) {
      if(!error) {
        onSuccess(order);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Saves the supplied order
   *
   * @param {object} order
   * @param {function} onSuccess - Happy path callback whose signature matches "function(order)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var save = function(order, onSuccess, onFailure) {
    // Sanitize params
    Params.required('order', order, 'object');
    // Save order
    if(order._id) {
      update(order, onSuccess, onFailure);
    }
    else {
      create(order, onSuccess, onFailure);
    }
  };

  /**
   * Deletes the order w/ the supplied id
   *
   * @param {string} id
   * @param {function} onSuccess - Happy path callback whose signature matches "function(order)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var deleteById = function(id, onSuccess, onFailure) {
    // Sanitize params
    Params.required('id', id, 'string').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Delete order
    Order.findByIdAndRemove(id, function(error, order) {
      if(!error) {
        onSuccess(order);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Creates the supplied order
   *
   * @param {object} order
   * @param {function} onSuccess - Happy path callback whose signature matches "function(order)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var create = function(order, onSuccess, onFailure) {
    // Sanitize params
    Params.required('order', order, 'object').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Create order
    new Order(order).save(function(error, savedOrder) {
      if(!error) {
        onSuccess(savedOrder);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Updates the supplied order
   *
   * @param {object} order
   * @param {function} onSuccess - Happy path callback whose signature matches "function(order)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var update = function(order, onSuccess, onFailure) {
    // Sanitize params
    Params.required('order', order, 'object');
    var onFailure = onFailure || _.noop;
    // Update order
    Order.findByIdAndUpdate(order._id, {
      $set: order
    }, function(error) {
      if(!error) {
        findById(order._id, onSuccess, onFailure);
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