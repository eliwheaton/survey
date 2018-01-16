const Survey = require('../models').survey;

// Results main
exports.index = (req, res, next) => {
  Survey
    .count()
    .then((total) => {
      res.render('results/index', { total });
    })
    .catch(err => next(err));
};

