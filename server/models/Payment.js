'use strict';

// Import dependencies
var Mongoose = require('mongoose');

/**
 * Domain model representing an Payment
 */

// Create Mongoose schema
var PaymentSchema = new Mongoose.Schema({
  trip: {
    type: String
  },
  travelerName: {
    type: String,
    index: {unique: true}
  },
  amount: {
    type: Number
  },
  paymentInfo: {
    type: String
  }
});

// Create model from schema
var Payment = Mongoose.model('Payment', PaymentSchema);

// Export model
module.exports = Payment;