'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: "Users",
          key: "id",
        }
      },
      filename: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uniqueName: {
        type: Sequelize.STRING,
        unique: true,
      },
      sharedLink: {
        type: Sequelize.STRING,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Files');
  }
};