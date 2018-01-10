
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    session_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Todo;
};