"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Detail_specialty", {
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
      specialtyId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      treatmentMarkdown: {
        type: Sequelize.TEXT,
      },
      treatmentHTML: {
        type: Sequelize.TEXT,
      },
      strengthMarkdown: {
        type: Sequelize.TEXT,
      },
      strengthHTML: {
        type: Sequelize.TEXT,
      },
      serviceMarkdown: {
        type: Sequelize.TEXT,
      },
      serviceHTML: {
        type: Sequelize.TEXT,
      },
      examinationMarkdown: {
        type: Sequelize.TEXT,
      },
      examinationHTML: {
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
    await queryInterface.dropTable("Detail_specialty");
  },
};
