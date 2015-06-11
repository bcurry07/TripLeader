var crypto = require('crypto');
var basicAuth = require('basic-auth');

exports.createSalt = function() {
  return crypto.randomBytes(128).toString('base64');
};

exports.hashPwd = function(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
};

exports.basicAuth = function(username, password) {
  return function(req, res, next) {
    var user = basicAuth(req);

    if(!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    }
    next();
  }
};