"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("detail_clinic", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clinicId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bookingMarkdown: {
        type: Sequelize.TEXT,
      },
      bookingHTML: {
        type: Sequelize.TEXT,
      },
      strengthMarkdown: {
        type: Sequelize.TEXT,
      },
      strengthHTML: {
        type: Sequelize.TEXT,
      },
      equipmentMarkdown: {
        type: Sequelize.TEXT,
      },
      equipmentHTML: {
        type: Sequelize.TEXT,
      },
      serviceMarkdown: {
        type: Sequelize.TEXT,
      },
      serviceHTML: {
        type: Sequelize.TEXT,
      },
      locationMarkdown: {
        type: Sequelize.TEXT,
      },
      locationHTML: {
        type: Sequelize.TEXT,
      },
      examinationMarkdown: {
        type: Sequelize.TEXT,
      },
      examinationHTML: {
        type: Sequelize.TEXT,
      },
      noteMarkdown: {
        type: Sequelize.TEXT,
      },
      noteHTML: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("detail_clinic");
  },
};
