const bcrypt = require('bcryptjs');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
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
    }
  });

  User.associate = (models) => {
    User.hasMany(models.upload, {foreignKey: 'userId', sourceKey: 'uuid'});
    User.sync();
  };

  User.prototype.apiRepr = function() {
    return {
      id: this.id,
      username: this.username || '',
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

  User.sync();
  return User;
};
