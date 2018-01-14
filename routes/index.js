const express = require('express');
const router = express.Router();
const questions = require('../controllers/questions');

// Show survey question
router.get('/', questions.display);

module.exports = router;
