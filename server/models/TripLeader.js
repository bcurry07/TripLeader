'use strict';

// Import dependencies
var Mongoose = require('mongoose');
var Auth = require('../utilities/Auth');

/**
 * Domain model representing a Trip Leader
 */

// Create Mongoose schema
var TripLeaderSchema = new Mongoose.Schema({
  name: {
    type: String,
    index: { unique: true}
  },
  trips: {
    type: [String]
  },
  salt: String,
  hashed_pw: String
});

TripLeaderSchema.methods = {
  authenticate: function(passwordToMatch) {
    return Auth.hashPwd(this.salt, passwordToMatch) === this.hashed_pw;
  }
};

// Create model from schema
var TripLeader = Mongoose.model('TripLeader', TripLeaderSchema);

// Export model
module.exports = TripLeader;
