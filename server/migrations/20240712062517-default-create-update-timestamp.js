'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Update createdAt column
    await queryInterface.changeColumn('user', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });

    // Update updatedAt column
    await queryInterface.changeColumn('user', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback changes for createdAt column
    await queryInterface.changeColumn('user', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    // Rollback changes for updatedAt column
    await queryInterface.changeColumn('user', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  }
};