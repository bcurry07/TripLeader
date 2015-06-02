'use strict';

// Import dependencies
var _ = require('underscore');
var Params = require('../utilities/Params');
var TripLeader = require('../models/TripLeader');

/**
 * Service responsible for handling interactions involving TripLeaders
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
    TripLeader.find(criteria, function(error, questions) {
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
    TripLeader.findById(id, function(error, question) {
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
  var save = function(tripLeader, onSuccess, onFailure) {
    // Sanitize params
    Params.required('tripLeader', tripLeader, 'object');
    // Save question
    if(tripLeader._id) {
      update(tripLeader, onSuccess, onFailure);
    }
    else {
      create(tripLeader, onSuccess, onFailure);
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
    TripLeader.findByIdAndRemove(id, function(error, tripLeader) {
      if(!error) {
        onSuccess(tripLeader);
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
  var create = function(tripLeader, onSuccess, onFailure) {
    // Sanitize params
    Params.required('tripLeader', tripLeader, 'object').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Create question
    new TripLeader(tripLeader).save(function(error, savedTripLeader) {
      if(!error) {
        onSuccess(savedTripLeader);
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
  var update = function(tripLeader, onSuccess, onFailure) {
    // Sanitize params
    Params.required('tripLeader', question, 'object');
    var onFailure = onFailure || _.noop;
    // Update question
    TripLeader.findByIdAndUpdate(tripLeader._id, {
      $set: tripLeader
    }, function(error) {
      if(!error) {
        findById(tripLeader._id, onSuccess, onFailure);
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