"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn("Specialties", "doctorId", "clinicId", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    // return Promise.all([
    //   queryInterface.renameColumn("Users", "", {
    //     type: Sequelize.STRING,
    //     allowNull: true,
    //   }),
    // ]);
  },
};
