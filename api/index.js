const app = require('express')();
const router = require('express').Router();
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const ejs = require('ejs');
const params = require('./config/params')(process.env.APP_ENV || 'development');

const clientsController = require('./controllers/clientController');
const authController = require('./controllers/authController');
const oauth2Controller = require('./controllers/oauth2Controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(logger('dev'));

app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

app.set('view engine', 'ejs');

router.route('/clients')
  .post(authController.isAuthenticated, clientsController.postClient)
  .get(authController.isAuthenticated, clientsController.getClientsByUserId);

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);


router.route('/').get((req, res) => {
  res.json({message: 'Entrypoint'});
});

app.use('/api', router);

app.listen(params.PORT, () => {
  console.log(`App listening on ${params.PORT}`);
});