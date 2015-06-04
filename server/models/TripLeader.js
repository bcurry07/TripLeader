'use strict';

// Import dependencies
var Mongoose = require('mongoose');

/**
 * Domain model representing a Trip Leader
 */

// Create Mongoose schema
var TripLeaderSchema = new Mongoose.Schema({
  name: {
    type: String,
    index: { unique: true}
  },
  password: {
    type: String
  },
  trips: {
    type: [String]
  }
});

// Create model from schema
var TripLeader = Mongoose.model('TripLeader', TripLeaderSchema);

// Export model
module.exports = TripLeader;
