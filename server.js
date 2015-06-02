'use strict';

/**
 * Main "driver" class responsible for bootstrapping the app
 */

// Constants
var CONTROLLERS_PATH = './server/controllers';
var MODELS_PATH = './server/models';

// Import dependencies
var BodyParser = require('body-parser');
var Express = require('express');
var Mongoose = require('mongoose');
var RequireDirectory = require('require-directory');
var Config = require('./server/utilities/Config');
var ErrorResponse = require('./server/utilities/ErrorResponse');
var Log = require('./server/utilities/Log');
var path = require('path');

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

// Start Express server
(function(server, config) {
  var instance = server.listen(config.port, config.host, function() {
    var host = instance.address().address;
    var port = instance.address().port;
    Log.info('Express server started @ http://%s:%s.', host, port);
  });
}(server, Config.server));
