"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn(
        "specialties",
        "contentHTML",
        "detailMarkdown",
        {
          type: Sequelize.TEXT,
        }
      ),
      queryInterface.renameColumn(
        "specialties",
        "contentMarkdown",
        "detailHTML",
        {
          type: Sequelize.TEXT,
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
