'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Resume, {
        foreignKey: 'userId',
        as: 'resumes'
      })

      User.hasMany(models.Application, {
        foreignKey: "userId",
        as: "applications"
      });
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
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: "users",
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: prepareUser,
      beforeUpdate: prepareUser
    }
  });
  return User;
};

async function prepareUser(user) {
  normalizeEmail(user);
  if (user.changed("password")) {
    await hashPassword(user);
  }
}

function normalizeEmail(user) {
  if (user.email) {
    user.email = user.email.toLowerCase().trim();
  }
}

const SALT_ROUNDS = 10;

async function hashPassword(user) {
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
}