const oauth2orize = require('oauth2orize');
const uuid = require('uuid');
const User = require('../models').User;
const Client = require('../models').Client;
const Token = require('../models').Token;
const Code = require('../models').Code;

const server = oauth2orize.createServer();

server.serializeClient((client, callback) => callback(null, client.id));

server.deserializeClient((id, callback) => {
  Client.findOne({ where: {id}}).then(client => {
    return callback(null, client);
  }).catch(err => callback(err));
});

server.grant(oauth2orize.grant.code(
  (client, redirectUri, user, ares, callback) => {
    const value = uuid.v4();
    Code.create({
      id: uuid.v4(),
      clientId: client.id,
      userId: user.id,
      redirectUri: redirectUri,
      value: value
    }).then(() => {
      callback(null, value);
    }).catch(err => callback(err));
  }
));

server.exchange(oauth2orize.exchange.code(
  (client, code, redirectUri, callback) => {
  Code.findOne({ where: { value: code }}).then(authCode => {
    if (authCode === undefined) { return callback(null, false); }
    if (client.id !== authCode.clientId) { return callback(null, false); }
    // if (redirectUri !== authCode.redirectUri) { return callback(null, false); }

    // Delete auth code now that it has been used
    Code.destroy({where: {value: code}}).catch(err => callback(err));

    // Create a new access token
    Token.create({
      id: uuid.v4(),
      value: uuid.v4(),
      clientId: authCode.clientId,
      userId: authCode.userId
    }).then(token => {
      callback(null, token.value);
    }).catch(err => callback(err));
  });
}));

exports.authorization = [
  server.authorization(function(clientId, redirectUri, callback) {
    Client.findOne({ where: {id: clientId }}).then(client => {
      if (!client) {
        return callback(null, false);
      }
      return callback(null, client, redirectUri);
    }).catch(err => callback(err));
  }),
  (req, res) => {
    res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
  }
];

exports.decision = [
  server.decision()
];

exports.token = [
  server.token(),
  server.errorHandler()
];


