'use strict';

// Import dependencies
var _ = require('underscore');
var Params = require('../utilities/Params');
var Trip = require('../models/Trip');

/**
 * Service responsible for handling interactions involving Trips
 */
module.exports = function() {

  /**
   * Returns a list of questions that match the supplied criteria
   *
   * @param {object} criteria
   * @param {function} onSuccess - Happy path callback whose signature matches "function(questions)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var list = function(criteria, onSuccess, onFailure) {
    // Sanitize params
    Params.required('criteria', criteria, 'object').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // List questions
    Trip.find(criteria, function(error, questions) {
      if(!error) {
        onSuccess(questions);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Finds a question w/ the supplied id
   *
   * @param {string} id
   * @param {function} onSuccess - Happy path callback whose signature matches "function(question)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var findById = function(id, onSuccess, onFailure) {
    // Sanitize params
    Params.required('id', id, 'string').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Find question
   Trip.findById(id, function(error, question) {
      if(!error) {
        onSuccess(question);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Saves the supplied question
   *
   * @param {object} question
   * @param {function} onSuccess - Happy path callback whose signature matches "function(question)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var save = function(trip, onSuccess, onFailure) {
    // Sanitize params
    Params.required('trip', trip, 'object');
    // Save question
    if(trip._id) {
      update(trip, onSuccess, onFailure);
    }
    else {
      create(trip, onSuccess, onFailure);
    }
  };

  /**
   * Deletes the question w/ the supplied id
   *
   * @param {string} id
   * @param {function} onSuccess - Happy path callback whose signature matches "function(question)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var deleteById = function(id, onSuccess, onFailure) {
    // Sanitize params
    Params.required('id', id, 'string').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Delete question
    Trip.findByIdAndRemove(id, function(error, trip) {
      if(!error) {
        onSuccess(trip);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Creates the supplied question
   *
   * @param {object} question
   * @param {function} onSuccess - Happy path callback whose signature matches "function(question)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var create = function(trip, onSuccess, onFailure) {
    // Sanitize params
    Params.required('trip', trip, 'object').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Create question
    new Trip(trip).save(function(error, savedTrip) {
      if(!error) {
        onSuccess(savedTrip);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Updates the supplied question
   *
   * @param {object} question
   * @param {function} onSuccess - Happy path callback whose signature matches "function(question)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var update = function(trip, onSuccess, onFailure) {
    // Sanitize params
    Params.required('trip', question, 'object');
    var onFailure = onFailure || _.noop;
    // Update question
    Trip.findByIdAndUpdate(trip._id, {
      $set: trip
    }, function(error) {
      if(!error) {
        findById(trip._id, onSuccess, onFailure);
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