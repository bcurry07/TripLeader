var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Mongoose = require('mongoose');

var Trip = Mongoose.model('Trip');

module.exports = function() {

  passport.use(new LocalStrategy(
    function(tripDestination, tripPassword, done) {
      console.log('hi');
      Trip.findOne({loginId:tripDestination}).exec(function(err, trip) {
        if(trip && trip.authenticate(tripPassword)) {
          console.log('works');
          return done(null, trip);
        }
        else {
          console.log('doesnt work');
          return done(null, false);
        }
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    if(user) {
      done(null, user._id);
    }
  });

  passport.deserializeUser(function(id, done) {
    Trip.findOne({_id:id}).exec(function(err, user) {
      if(user) {
        return done(null, user);
      }
      else {
        return done(null, false);
      }
    });
  });
};