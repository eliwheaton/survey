const Survey = require('../models').survey;
const SurveyAnswer = require('../models').surveyAnswer;

// Results main
exports.index = (req, res, next) => {
  Survey
    .findAll({
      include: { model: SurveyAnswer },
    })
    .then((surveys) => {
      res.render('results/index', { surveys });
    })
    .catch(err => next(err));
};
