'use strict';
const { Model } = require('sequelize');
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
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.INTEGER, // 0-> Student, 1-> Instructor, 3-> Admin
      avatar: DataTypes.STRING,
      birthdate: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
