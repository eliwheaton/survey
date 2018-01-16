const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const hbs = require('hbs');
const models = require('./models');

const redisClient = redis.createClient(process.env.REDIS_URL);

// Sync Database
models.sequelize.sync().then(() => {
  console.log('Database synced.');
}).catch((err) => {
  console.log(err, 'Oops, something went wrong with the DB.');
});

const index = require('./routes/index');
const users = require('./routes/users');
const questions = require('./routes/questions');
const surveys = require('./routes/surveys');
const results = require('./routes/results');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client: redisClient,
  }),
  secret: 'you should hire Eli',
  saveUninitialized: true,
  resave: false,
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
app.use('/results', results);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
