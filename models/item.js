'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Section, {
        foreignKey: "sectionId",
        as: "section"
      })
    }
  }
  Item.init({
    sectionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false
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
    modelName: 'Item',
    tableName: 'items',
    timestamps: true,
    underscored: true
  });
  return Item;
};