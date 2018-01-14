const Question = require('../models').question;
const Answer = require('../models').answer;
const Survey = require('../models').survey;
const Sequelize = require('sequelize');

exports.index = (req, res, next) => {
  Question.findAll().then(questions => {
    res.render('questions/index', { questions: questions });
  })
}

// Add question form
exports.addForm = (req, res, next) => {
  res.render('questions/add');
}

// Create survey question
exports.create = (req, res, next) => {
  
  // Create question
  Question.create({
    text: req.body.question
  })
  .then(question => {

    // Get all the answers
    let answers = req.body.answers.filter(answer => answer != '');

    // Create all the answers
    let promises = answers.map(answer => {
      return Answer.create({
        text: answer,
        questionId: question.id
      });
    });

    Promise.all(promises)
    .then(() => {
      res.redirect('/questions');
    })
    .catch(err => {
      return next(err);
    })

  })
  .catch(err => {
    return next(err);
  });

}

// Show a survey question
exports.display = (req, res, next) => {
  const Op = Sequelize.Op;

  // Get any surveys that this guest has already answered.
  Survey.findAll({
    attributes: ['questionId'],
    where: { guestId: req.session.id },
    raw: true
  })
  .then(completedSurveys => {

    // Get the question Ids
    let questionIds = completedSurveys.map(question => {
      return question.questionId;
    });

    // Select a question that they haven't already answered.
    Question.findOne({
      include: [{
        model: Answer
      }],
      where: {
        id: {
          [Op.notIn]: questionIds
        }
      }
    })
    .then(question => {
      res.render('questions/display', { question: question });
    }).catch(err => {
      return next(err);
    })

  })

}



















