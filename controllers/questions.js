const Question = require('../models').question;
const Answer = require('../models').answer;
const Survey = require('../models').survey;
const Sequelize = require('sequelize');

exports.index = (req, res) => {
  Question.findAll().then((questions) => {
    res.render('questions/index', { questions });
  });
};

// Add question form
exports.addForm = (req, res) => {
  res.render('questions/add');
};

// Create survey question
exports.create = (req, res, next) => {
  // Create question
  Question.create({
    text: req.body.question,
    multiple: req.body.multiple || false,
  })
    .then((question) => {
      // Get all the answers
      const answers = req.body.answers.filter(answer => answer !== '');

      // Create all the answers
      const promises = answers.map(answer => (
        Answer.create({
          text: answer,
          questionId: question.id,
        })
      ));

      Promise.all(promises)
        .then(() => {
          res.redirect('/questions');
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

// Show a survey question
exports.display = (req, res, next) => {
  const { Op } = Sequelize;

  // Get any surveys that this guest has already answered.
  Survey.findAll({
    attributes: ['questionId'],
    where: { guestId: req.session.id },
    raw: true,
  })
    .then((completedSurveys) => {
      // Get the question Ids
      const questionIds = completedSurveys.map(question => question.questionId);

      // Select a question that they haven't already answered.
      Question.findOne({
        include: [{
          model: Answer,
        }],
        where: {
          id: {
            [Op.notIn]: questionIds,
          },
        },
      })
        .then((question) => {
          res.render('questions/display', { question });
        }).catch(err => next(err));
    })
    .catch(err => next(err));
};
