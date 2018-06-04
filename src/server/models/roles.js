// Model definition for user roles
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Role.sync();
  return Role;

};