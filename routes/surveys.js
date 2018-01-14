const express = require('express');
const router = express.Router();
const auth = require('../lib/auth');
const surveys = require('../controllers/surveys');

// Save survey
router.post('/', surveys.create);


module.exports = router;
