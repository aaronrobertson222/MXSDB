module.exports = (sequelize, DataTypes) => {
  const Upload = sequelize.define('upload', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uploadType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unkown'
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unkown'
    },
    uploadDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now()
    },
    downloadCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    fileKey: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unkown'
    },
    fileLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unkown'
    },
    imageKey: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unkown'
    },
    imageLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unkown'
    }
  });

  Upload.sync({force: true}).then(() => {
    return Upload.create({
      title: 'test title 1'
    });
  });

  Upload.associate = (models) => {
    Upload.belongsTo(models.user, {as: 'creator'});
  };

  return Upload;
};
