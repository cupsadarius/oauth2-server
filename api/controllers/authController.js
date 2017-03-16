const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models').User;
const Client = require('../models').Client;
const Token = require('../models').Token;

passport.use(new BasicStrategy(
  (email, password, callback) => {
    User.findOne({ where: {email}})
      .then(user => {
        if (user.password == password) {
          callback(null, user);
        } else {
          callback(null, false);
        }
      })
      .catch(err => callback(err));
  }
));

passport.use('client-basic', new BasicStrategy(
  function(id, secret, callback) {
    Client.findOne({ where: { id }}).then(client => {
      // No client found with that id or bad password
      if (!client || client.secret !== secret) {
        return callback(null, false);
      }
      // Success
      return callback(null, client);
    }).catch(err => callback(err));
  })
);

passport.use(new BearerStrategy(
  function(accessToken, callback) {
    Token.findOne({ where: {value: accessToken }}).then(token => {

      if (!token) { return callback(null, false); }

      User.findOne({ where: { id: token.userId }}).then(user => {

        if (!user) { return callback(null, false); }

        // Simple example with no scope
        callback(null, user, { scope: '*' });
      }).catch(err => callback(err));
    }).catch(err => callback(err));
  }
));



exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });