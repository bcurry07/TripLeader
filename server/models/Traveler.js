'use strict';

// Import dependencies
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

/**
 * Domain model representing a Traveler
 */

// Create Mongoose schema
var TravelerSchema = new Mongoose.Schema({
  name: {
    type: String
  },
  _trip: {
    type: Schema.Types.ObjectId, ref: 'Trip'
  },
  orders: {
    type: [String]
  }
});

// Create model from schema
var Order = Mongoose.model('Traveler', TravelerSchema);

// Export model
module.exports = Order;