'use strict';

// Import dependencies
var passport = require('passport');

/**
 * Controller responsible for handling RESTful interactions involving Orders
 */
module.exports = function(router) {

  router.post('/login', function(req, res, next) {
    var auth = passport.authenticate('local', function(err, user) {
      if(err) {return next(err);}
      if(!user) { res.send({success:false});}
      req.logIn(user, function(err) {
        if(err) {return next(err);}
        res.send({success:true, user:user});
      });
    });
    auth(req, res, next);
  });

  router.post('/logout', function(req, res, next) {
    req.logout();
    res.end();
  });




};
