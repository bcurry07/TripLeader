'use strict';

// Import dependencies
var Mongoose = require('mongoose');

/**
 * Domain model representing an Order
 */

// Create Mongoose schema
var OrderSchema = new Mongoose.Schema({
  item: {
    type: String
  },
  trip: {
    type: String
  },
  travelerName: {
    type: String,
    index: {unique: true}
  },
  cost: {
    type: Number
  }
});

// Create model from schema
var Order = Mongoose.model('Order', OrderSchema);

// Export model
module.exports = Order;