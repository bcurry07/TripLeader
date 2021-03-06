'use strict';

/**
 * Object containing all of the app config settings.
 * Retrieve a property via syntax similar to:
 * 
 *   - Config.server.host
 *   - Config.database.port
 */
module.exports = function() {

  // Here are all the must-have environment variables
  var REQUIRED_ENVIRONMENT_VARIABLES = [
    // 'IDA_DATABASE_HOST',
    // 'IDA_DATABASE_PORT',
    // etc...
  ];

  // Checks for required environment variables and errors out if any are missing
  (function(environmentVariables) {
    var missingSomething = false;
    for(var i in environmentVariables) {
      var environmentVariable = environmentVariables[i];
      if(!process.env[environmentVariable]) {
        missingSomething = true;
        console.error('The "%s" environment variable *must* be defined!', environmentVariable);
      }
    }
    if(missingSomething) {
      process.exit(1);
    }
  }(REQUIRED_ENVIRONMENT_VARIABLES));

  // Public API
  return {
    'database': {
      'host': process.env.IDA_DATABASE_HOST || '0.0.0.0',
      'port': process.env.IDA_DATABASE_PORT || '27017',
      'name': process.env.IDA_DATABASE_NAME || '',
      'user': process.env.IDA_DATABASE_USER || '',
      'pass': process.env.IDA_DATABASE_PASS || ''
    },
    'server': {
      'host': process.env.IDA_SERVER_HOST || '0.0.0.0',
      'port': process.env.IDA_SERVER_PORT || '3000'
    },
    'log': {
      'level': process.env.IDA_LOG_LEVEL || 'debug'
    },
    'dev': process.env.IDA_DEV_MODE || true
  };

}();