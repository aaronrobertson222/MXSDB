const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING
    },
    firstname: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    joinedDate: {
      type: DataTypes.DATE
    }
  });

  User.prototype.generateHash = (password) => {
    return bcrypt.hash(password, bcrypt.genSaltSync(8));
  };

  User.prototype.validPassword = (password) => {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
