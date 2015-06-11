'use strict';

// Import dependencies
var Mongoose = require('mongoose');
var Auth = require('../utilities/Auth');

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
  },
  salt: String,
  hashed_pw: String
});

TripSchema.methods = {
  authenticate: function(passwordToMatch) {
    console.log('authenticating trip...');
    return Auth.hashPwd(this.salt, passwordToMatch) === this.hashed_pw;
  }
};

// Create model from schema
var Trip = Mongoose.model('Trip', TripSchema);

// Export model
module.exports = Trip;
