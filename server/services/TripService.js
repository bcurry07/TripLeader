'use strict';

// Import dependencies
var _ = require('underscore');
var Params = require('../utilities/Params');
var Trip = require('../models/Trip');
var Auth = require('../utilities/Auth');

/**
 * Service responsible for handling interactions involving Trips
 */
module.exports = function() {

  /**
   * Returns a list of trips that match the supplied criteria
   *
   * @param {object} criteria
   * @param {function} onSuccess - Happy path callback whose signature matches "function(trips)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var list = function(criteria, onSuccess, onFailure) {
    // Sanitize params
    Params.required('criteria', criteria, 'object').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // List trips
    Trip.find(criteria, function(error, trips) {
      if(!error) {
        trips.forEach(function(trip) {
          delete trip.salt;
          delete trip.hashed_pw;
        });
        onSuccess(trips);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Finds a trip w/ the supplied id
   *
   * @param {string} id
   * @param {function} onSuccess - Happy path callback whose signature matches "function(trip)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var findById = function(id, onSuccess, onFailure) {
    // Sanitize params
    Params.required('id', id, 'string').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Find trip
   Trip.findById(id, function(error, trip) {
      if(!error) {
        delete trip.salt;
        delete trip.hashed_pw;
        onSuccess(trip);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Saves the supplied trip
   *
   * @param {object} trip
   * @param {function} onSuccess - Happy path callback whose signature matches "function(trip)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var save = function(trip, onSuccess, onFailure) {
    // Sanitize params
    Params.required('trip', trip, 'object');
    // Save trip
    if(trip._id) {
      update(trip, onSuccess, onFailure);
    }
    else {
      var salt, hash;
      salt = Auth.createSalt();
      hash = Auth.hashPwd(salt, trip.password);

      trip.salt = salt;
      trip.hashed_pw = hash;

      create(trip, onSuccess, onFailure);
    }
  };

  /**
   * Deletes the trip w/ the supplied id
   *
   * @param {string} id
   * @param {function} onSuccess - Happy path callback whose signature matches "function(trip)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var deleteById = function(id, onSuccess, onFailure) {
    // Sanitize params
    Params.required('id', id, 'string').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Delete trip
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
   * Creates the supplied trip
   *
   * @param {object} trip
   * @param {function} onSuccess - Happy path callback whose signature matches "function(trip)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var create = function(trip, onSuccess, onFailure) {
    // Sanitize params
    Params.required('trip', trip, 'object').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Create trip
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
   * Updates the supplied trip
   *
   * @param {object} trip
   * @param {function} onSuccess - Happy path callback whose signature matches "function(trip)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var update = function(trip, onSuccess, onFailure) {
    // Sanitize params
    Params.required('trip', trip, 'object');
    var onFailure = onFailure || _.noop;
    // Update trip
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