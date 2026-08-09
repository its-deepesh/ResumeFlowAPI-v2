'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Version extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Version.belongsTo(models.Resume, {
        foreignKey: "resumeId",
        as: "resume"
      });
    }
  }
  Version.init({
    resumeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    versionNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: {
          args: [1],
          msg: "Version number must be at least 1"
        }
      }
    },
    snapshot: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Version',
    tableName: 'versions',
    timestamps: true,
    underscored: true
  });
  return Version;
};