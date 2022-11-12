"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Packet_examination", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      contentMarkdown: {
        type: Sequelize.TEXT("long"),
      },
      contentHTML: {
        type: Sequelize.TEXT("long"),
      },
      typepacket: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      clinicId: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT("long"),
      },
      image: {
        type: Sequelize.TEXT("long"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Packet_examination");
  },
};
