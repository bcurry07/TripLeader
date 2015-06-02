'use strict';

// Import dependencies
var Mongoose = require('mongoose');

/**
 * Domain model representing a Trip
 */

// Create Mongoose schema
var TripSchema = new Mongoose.Schema({
  name: {
    type: String,
    index: { unique: true}
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  prices: {
    flight: Number,
    liftTicket: Number
  }
});

// Create model from schema
var Trip = Mongoose.model('Trip', TripSchema);

// Export model
module.exports = Trip;
