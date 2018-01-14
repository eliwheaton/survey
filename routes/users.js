const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const auth = require('../lib/auth');

// Sign up
router.get('/signup', users.signup);
router.post('/signup', users.create);

// Sign in
router.get('/signin', users.signin);
router.post('/signin', passport.authenticate('local'), users.authenticate);


module.exports = router;
