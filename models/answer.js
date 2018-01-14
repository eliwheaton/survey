
module.exports = (sequelize, DataTypes) => {

  const Answer = sequelize.define('answer', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    text: {
      type: DataTypes.TEXT
    }
  });

  return Answer;
}