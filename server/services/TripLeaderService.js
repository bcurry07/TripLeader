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
   * Returns a list of tripLeaders that match the supplied criteria
   *
   * @param {object} criteria
   * @param {function} onSuccess - Happy path callback whose signature matches "function(tripLeaders)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var list = function(criteria, onSuccess, onFailure) {
    // Sanitize params
//    Params.required('criteria', criteria, 'object').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // List tripLeaders
    TripLeader.find(criteria, function(error, tripLeaders) {
      if(!error) {
        onSuccess(tripLeaders);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Finds a tripLeader w/ the supplied id
   *
   * @param {string} id
   * @param {function} onSuccess - Happy path callback whose signature matches "function(tripLeader)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var findById = function(id, onSuccess, onFailure) {
    // Sanitize params
//    Params.required('id', id, 'string').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Find tripLeader
    TripLeader.findById(id, function(error, tripLeader) {
      if(!error) {
        onSuccess(tripLeader);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Saves the supplied tripLeader
   *
   * @param {object} tripLeader
   * @param {function} onSuccess - Happy path callback whose signature matches "function(tripLeader)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var save = function(tripLeader, onSuccess, onFailure) {

    // Sanitize params
    //Params.required('tripLeader', tripLeader, 'object');
    // Save tripLeader
    if(tripLeader._id) {
      update(tripLeader, onSuccess, onFailure);
    }
    else {
      var newTripLeader = {
        name: tripLeader.name,
        password: tripLeader.password,
        trips: [tripLeader.trip]
      };
      create(newTripLeader, onSuccess, onFailure);
    }
  };

  /**
   * Deletes the tripLeader w/ the supplied id
   *
   * @param {string} id
   * @param {function} onSuccess - Happy path callback whose signature matches "function(tripLeader)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var deleteById = function(id, onSuccess, onFailure) {
    // Sanitize params
//    Params.required('id', id, 'string').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Delete tripLeader
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
   * Creates the supplied tripLeader
   *
   * @param {object} tripLeader
   * @param {function} onSuccess - Happy path callback whose signature matches "function(tripLeader)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var create = function(tripLeader, onSuccess, onFailure) {
    // Sanitize params
//    Params.required('tripLeader', tripLeader, 'object').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Create tripLeader
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
   * Updates the supplied tripLeader
   *
   * @param {object} tripLeader
   * @param {function} onSuccess - Happy path callback whose signature matches "function(tripLeader)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var update = function(tripLeader, onSuccess, onFailure) {
    // Sanitize params
//    Params.required('tripLeader', tripLeader, 'object');
    var onFailure = onFailure || _.noop;
    // Update tripLeader
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