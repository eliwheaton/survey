const Survey = require('../models').survey;
const SurveyAnswer = require('../models').surveyAnswer;
const Answer = require('../models').answer;


// Save survey answer
exports.create = (req, res, next) => {
  
  // Get the text for the answer that was chosen.
  Answer.findById(req.body.answer)
  .then(answer => {

    // Save the survey
    Survey.create({
      guestId: req.session.id,
      questionId: req.body.questionId,
      questionText: req.body.questionText
    })
    .then(survey => {

      // Save the survey answer
      SurveyAnswer.create({
        surveyId: survey.id,
        answerId: answer.id,
        answerText: answer.text
      })
      .then(() => {
        // Redirect to the homepage (next question)
        res.redirect('/');
      })
      .catch(err => {
        return next(err);
      })

    })
    .catch(err => {
      return next(err);
    })

  });

}