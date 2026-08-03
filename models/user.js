'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [2, 100],
          msg: "Name must be at least 2 characters long",
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [8, 100],
          msg: "Password must be at least 8 characters long",
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: "users",
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: normalizeEmail,
      beforeUpdate: normalizeEmail
    }
  });
  return User;
};

function normalizeEmail(user) {
  if (user.email) {
    user.email = user.email.toLowerCase().trim();
  }
}