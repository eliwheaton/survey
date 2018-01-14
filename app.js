const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient();
const passport = require('passport');
const hbs = require('hbs');
const env = require('dotenv').load();
const models = require('./models');

//Sync Database
models.sequelize.sync().then(function() {
  console.log('Database synced up.')
}).catch(function(err) {
  console.log(err, "Bro, something went wrong with your DB.")
});


const index = require('./routes/index');
const users = require('./routes/users');
const questions = require('./routes/questions');
const surveys = require('./routes/surveys');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client: redisClient
  }),
  secret: 'you should hire Eli',
  saveUninitialized: true,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(models.user.createStrategy());
passport.serializeUser(models.user.serializeUser());
passport.deserializeUser(models.user.deserializeUser());

// Store the user so we can use it in our templates
app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }

  next();
});

// Application routes
app.use('/', index);
app.use('/users', users);
app.use('/questions', questions);
app.use('/surveys', surveys);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
