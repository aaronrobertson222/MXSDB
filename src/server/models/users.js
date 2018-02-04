module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING
    }
  });

  User.sync({force: true}).then(() => {
    return User.create({
      username: 'aaronr5'
    });
  });

  return User;
};
