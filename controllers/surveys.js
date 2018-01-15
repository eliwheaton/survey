const Sequelize = require('sequelize');
const Survey = require('../models').survey;
const SurveyAnswer = require('../models').surveyAnswer;
const Answer = require('../models').answer;

const { Op } = Sequelize;

// Save survey answer
exports.create = (req, res, next) => {
  // Save the answer ids in an array for use in our query below
  const answerIds = Array.isArray(req.body.answer) ? req.body.answer : [req.body.answer];

  // Get the text for the answer(s) that were chosen.
  Answer.findAll({
    where: {
      id: {
        [Op.in]: answerIds,
      },
    },
    raw: true,
  })
    .then((answers) => {
      // Save the survey
      Survey.create({
        guestId: req.session.id,
        questionId: req.body.questionId,
        questionText: req.body.questionText,
        multiple: req.body.multiple,
      })
        .then((survey) => {
          const surveyAnswers = answers.map(answer => ({
            surveyId: survey.id,
            answerId: answer.id,
            answerText: answer.text,
          }));

          // Save the survey answer
          SurveyAnswer.bulkCreate(surveyAnswers)
            .then(() => {
              // Redirect to the homepage (next question)
              res.redirect('/');
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
    });
};
