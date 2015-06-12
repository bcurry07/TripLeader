'use strict';

// Import dependencies
var _ = require('underscore');
var Params = require('../utilities/Params');
var Traveler = require('../models/Traveler');

/**
 * Service responsible for handling interactions involving Travelers
 */
module.exports = function() {

  /**
   * Returns a list of travelers that match the supplied criteria
   *
   * @param {object} criteria
   * @param {function} onSuccess - Happy path callback whose signature matches "function(travelers)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var list = function(criteria, onSuccess, onFailure) {
    // Sanitize params
    Params.required('criteria', criteria, 'object').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // List travelers
    Traveler.find(criteria, function(error, travelers) {
      if(!error) {
        onSuccess(travelers);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Finds a traveler w/ the supplied id
   *
   * @param {string} id
   * @param {function} onSuccess - Happy path callback whose signature matches "function(traveler)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var findById = function(id, onSuccess, onFailure) {
    // Sanitize params
    Params.required('id', id, 'string').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Find traveler
    Traveler.findById(id, function(error, traveler) {
      if(!error) {
        onSuccess(traveler);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Saves the supplied traveler
   *
   * @param {object} traveler
   * @param {function} onSuccess - Happy path callback whose signature matches "function(traveler)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var save = function(traveler, onSuccess, onFailure) {
    // Sanitize params
    Params.required('traveler', traveler, 'object');
    // Save traveler
    if(traveler._id) {
      update(traveler, onSuccess, onFailure);
    }
    else {
      create(traveler, onSuccess, onFailure);
    }
  };

  /**
   * Deletes the traveler w/ the supplied id
   *
   * @param {string} id
   * @param {function} onSuccess - Happy path callback whose signature matches "function(traveler)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var deleteById = function(id, onSuccess, onFailure) {
    // Sanitize params
    Params.required('id', id, 'string').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Delete traveler
    Traveler.findByIdAndRemove(id, function(error, traveler) {
      if(!error) {
        onSuccess(traveler);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Creates the supplied traveler
   *
   * @param {object} traveler
   * @param {function} onSuccess - Happy path callback whose signature matches "function(traveler)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var create = function(traveler, onSuccess, onFailure) {
    // Sanitize params
    Params.required('traveler', traveler, 'object').required('onSuccess', onSuccess, 'function');
    var onFailure = onFailure || _.noop;
    // Create traveler
    new Traveler(traveler).save(function(error, savedTraveler) {
      if(!error) {
        onSuccess(savedTraveler);
      }
      else {
        onFailure(error);
      }
    });
  };

  /**
   * Updates the supplied traveler
   *
   * @param {object} traveler
   * @param {function} onSuccess - Happy path callback whose signature matches "function(traveler)"
   * @param {function} [onFailure] - Happy path callback whose signature matches "function(error)"
   */
  var update = function(traveler, onSuccess, onFailure) {
    // Sanitize params
    Params.required('traveler', traveler, 'object');
    var onFailure = onFailure || _.noop;
    // Update traveler
    Traveler.findByIdAndUpdate(traveler._id, {
      $set: traveler
    }, function(error) {
      if(!error) {
        findById(traveler._id, onSuccess, onFailure);
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