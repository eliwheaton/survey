const express = require('express');
const surveys = require('../controllers/surveys');

const router = express.Router();

// Save survey
router.post('/', surveys.create);

module.exports = router;
