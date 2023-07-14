'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const {ServerConfig} = require('../config')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.File,{
        foreignKey:"userId",
        onDelete:"CASCADE",
      })
      this.hasMany(models.Comment,{
        foreignKey:"userId",
        onDelete:"CASCADE",
      })
    }
  }
  User.init({
    name: {type: DataTypes.STRING,allowNull:false},
    email: {type: DataTypes.STRING,allowNull:false,unique:true, validate:{isEmail: true}},
    password: {type: DataTypes.STRING,allowNull:false,validate:{len: [5,20],}},
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(function encryptPassword(User){
    const encryptedPassword = bcrypt.hashSync(User.password,Number(ServerConfig.SALT_ROUNDS))
    User.password = encryptedPassword
  })
  return User;
};