const express = require('express');
const results = require('../controllers/results');
const auth = require('../lib/auth');

const router = express.Router();

// Save survey
router.get('/', auth.check, results.index);

module.exports = router;
