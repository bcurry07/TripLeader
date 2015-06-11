'use strict';

/**
 * Main "driver" class responsible for bootstrapping the app
 */

// Constants
var CONTROLLERS_PATH = './server/controllers';
var MODELS_PATH = './server/models';

// Import dependencies
var BodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Express = require('express');
var Mongoose = require('mongoose');
var RequireDirectory = require('require-directory');
var Config = require('./server/utilities/Config');
var ErrorResponse = require('./server/utilities/ErrorResponse');
var Log = require('./server/utilities/Log');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Setup Mongoose connection
(function(Mongoose, config) {
  var port = (config.port.length > 0) ? ":" + config.port : '';
  var login = (config.user.length > 0) ? config.user + ":" + config.pass + "@" : '';
  var uri =  "mongodb://" + login + config.host + port + "/" + config.name;
  Mongoose.connect(uri, { db: { 
    safe: true 
  }}, function (error) {
    if(error) {
      Log.error('Unable to connect to Mongo database @ %s.', uri);
    } else {
      Log.info('Successfully connected to Mongo database @ %s.', uri);
    }
  });
}(Mongoose, Config.database));

// Bootstrap Mongoose-enabled models
(function(path) {
  RequireDirectory(module, path);
}(MODELS_PATH));

// Create Express router (for Controllers to mount their request handlers to)
var router = Express.Router();

// Configure JSON body parsing on the router
router.use(BodyParser.json());

// Bootstrap controllers and attach their corresponding routes to the router
(function(router, path) {
  RequireDirectory(module, path, { visit: function(controller) {
    controller(router);
  }});
}(router, CONTROLLERS_PATH));

// Create Express server and mount the router
var server = Express();
server.use(cookieParser());
server.use(BodyParser());
server.use(session({secret: 'ski club'}));
server.use(passport.initialize());
server.use(passport.session());

server.use('/api', router);

server.use(Express.static(path.join(__dirname, 'client')));

//server.get('/', function(req, res) {
//  res.render('index.html');
//});

//app.get('/partials/:partialPath', function(req, res) {
//  res.render('partials/' + req.params.partialPath);
//});

// Configure Express' global error handling
server.use(function(error, request, response, next) {
  ErrorResponse.send(response, 500, 'Shit broke, needs fixed', error.stack);
});

var Trip = Mongoose.model('Trip');
passport.use(new LocalStrategy(
  function(tripname, password, done) {
    Trip.findOne({name:tripname}).exec(function(err, trip) {
      if(trip && trip.authenticate(password)) {
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


server.post('/login', function(req, res, next) {
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

server.post('/logout', function(req, res, next) {
  req.logout();
  res.end();
});

// Start Express server
(function(server, config) {
  var instance = server.listen(config.port, config.host, function() {
    var host = instance.address().address;
    var port = instance.address().port;
    Log.info('Express server started @ http://%s:%s.', host, port);
  });
}(server, Config.server));
