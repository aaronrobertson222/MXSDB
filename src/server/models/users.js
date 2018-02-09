const bcrypt = require('bcryptjs');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    joinedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now()
    },
    accountLevel: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    },
    uploadCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });

  User.associate = (models) => {
    User.belongsToMany(models.upload, {through: 'UsersUploads'});
  };

  User.prototype.apiRepr = function() {
    return {
      username: this.username || '',
      name: `${this.firstname} ${this.lastname}` || '',
      userLevel: this.accountLevel,
      joinedDate: moment(this.joinedDate).format('MMM DD, YYYY'),
      uploads: this.uploads
    };
  };

  User.prototype.generateHash = function(password) {
    return bcrypt.hash(password, 10);
  };

  User.prototype.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };
  return User;
};
