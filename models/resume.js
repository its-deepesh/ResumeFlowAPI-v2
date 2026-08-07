'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Resume.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      })
    }
  }
  Resume.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [2, 100],
          msg: "Title must be between 2 and 100 characters"
        }
      }
    },
    template: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [2, 100],
          msg: "Template must be between 2 and 100 characters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Resume',
    tableName: 'resumes',
    timestamps: true,
    underscored: true
  });
  return Resume;
};