
module.exports = (sequelize, DataTypes) => {

  const Question = sequelize.define('question', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    text: {
      type: DataTypes.TEXT
    }
  });

  Question.associate = (models) => {
    Question.hasMany(models.answer);
  }

  return Question;
}