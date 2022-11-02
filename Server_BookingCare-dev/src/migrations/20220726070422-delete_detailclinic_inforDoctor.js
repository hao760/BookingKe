"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("doctor_info", "addressClinic"),
      queryInterface.removeColumn("doctor_info", "nameClinic"),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("doctor_info", "addressClinic", {
        type: Sequelize.TEXT,
      }),
      queryInterface.addColumn("doctor_info", "nameClinic", {
        type: Sequelize.TEXT,
      }),
    ]);
  },
};
