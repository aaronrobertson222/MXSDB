module.exports = (sequelize, DataTypes) => {
  const Upload = sequelize.define('upload', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    downloadCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    fileKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    scopes: {
      public: {
        where: {
          private: false,
        },
        limit: 12,
      },
    }
  });

  Upload.associate = function(models) {
    Upload.belongsTo(models.user);
    Upload.sync();
  };

  Upload.sync();

  return Upload;
};
