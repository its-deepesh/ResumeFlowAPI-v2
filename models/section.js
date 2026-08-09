'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Section.belongsTo(models.Resume, {
        foreignKey: 'resumeId',
        as: 'resume'
      });

      Section.hasMany(models.Item, {
        foreignKey: "sectionId",
        as: "items"
      })
    }
  }
  Section.init({
    resumeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [2, 100],
          msg: "Section name must be between 2 and 100 characters"
        }
      }
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: {
          args: [1],
          msg: "Position must be at least 1"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Section',
    tableName: 'sections',
    timestamps: true,
    underscored: true
  });
  return Section;
};