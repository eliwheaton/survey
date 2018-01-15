const express = require('express');
const questions = require('../controllers/questions');

const router = express.Router();

// Show survey question
router.get('/', questions.display);

module.exports = router;
