module.exports = function() {

  var client = './client/';
  var wiredep = require('wiredep');
  var bowerFiles = wiredep({devDependencies: true})['js'];
  var bower = {
    json: require('./bower.json'),
    directory: client + './bower_components',
    ignorePath: '../..'
  };

  var config = {

    wiredepOptions: {
      bowerJson: bower.json,
      directory: bower.directory,
      ignorePath: bower.ignorePath
    },
    css: client + 'styles/*.css',
    index: client + 'index.html',
    js: [
        client + 'js/app.js',
        client + 'js/**/*.js'
    ],
    browserReloadDelay: 1000,
    client: client,
    defaultPort: 7203,
    nodeServer: './server.js',
    server: './server/'
  };

  return config;
};