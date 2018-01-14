
module.exports = (sequelize, DataTypes) => {

  const Survey = sequelize.define('survey', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    guestId: {
      type: DataTypes.STRING
    },
    questionId: {
      type: DataTypes.STRING
    },
    questionText: {
      type: DataTypes.TEXT
    }
  });

  Survey.associate = (models) => {
    Survey.hasMany(models.surveyAnswer);
  }

  return Survey;
}