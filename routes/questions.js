const express = require('express');
const auth = require('../lib/auth');
const questions = require('../controllers/questions');

const router = express.Router();

// Questions list
router.get('/', auth.check, questions.index);

// Display add question form
router.get('/add', auth.check, questions.addForm);

// Create survey question
router.post('/', auth.check, questions.create);

module.exports = router;
