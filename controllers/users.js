const passport = require('passport');
const User = require('../models').user;

// Show sign up page
exports.signup = (req, res, next) => {
  res.render('users/signup');
}

// Register new user
exports.create = (req, res, next) => {
  User.register({ username: req.body.username }, req.body.password, (err, user) => {
    if (err) return next(err);
    if (!user) return next(new Error('Error registering user.'));

    passport.authenticate('local')(req, res, () => {
      res.redirect('/questions');
    });
  });
}

exports.signin = (req, res, next) => {
  res.render('users/signin');
}

exports.authenticate = (req, res, next) => {
  res.redirect('/questions');
}
