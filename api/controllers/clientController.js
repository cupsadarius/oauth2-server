const Client = require('../models').Client;
const uuid = require('uuid');

exports.getClientsByUserId = (req, res) => {
  Client.findAll({ where: {userId: req.user.id}}).then( (clients) => {
    res.json(clients);
  }).catch((err) => {
    res.end(err);
  });
};

exports.postClient = (req, res) => {
  Client.create({id: uuid.v4(), name: req.body.name, userId: req.user.id, clientId: uuid.v4()})
    .then(() => {
      res.json({message: 'Client successfully created.'});
    })
    .catch(err => res.end(err));
};

