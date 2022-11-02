"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("detail_clinic", "introduceMarkdown"),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("detail_clinic", "introduceMarkdown", {
        type: Sequelize.TEXT,
      }),
    ]);
  },
};
