
module.exports = (sequelize, DataTypes) => {
  const SurveyAnswer = sequelize.define('surveyAnswer', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    answerId: {
      type: DataTypes.INTEGER,
    },
    answerText: {
      type: DataTypes.TEXT,
    },
  });

  return SurveyAnswer;
};
