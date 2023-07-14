'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey:"userId",
        onDelete: "CASCADE",
      });
      this.hasMany(models.Comment,{
        foreignKey:"fileId",
        onDelete:"CASCADE",
      })
    }
  }
  File.init({
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    filename: {
      type:DataTypes.STRING,
      allowNull:false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uniqueName: {
      type: DataTypes.STRING,
      unique: true,
    },
    sharedLink: {
      type: DataTypes.STRING(1000),
      unique: true,
    },
    sharedWith: {
      type: DataTypes.JSON,
    },
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};