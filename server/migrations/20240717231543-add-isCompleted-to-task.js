'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('task', 'isCompleted', {
      type: Sequelize.BOOLEAN,
      allowNull: true, // hoặc false nếu bạn muốn bắt buộc
      default: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('task', 'isCompleted');
  }
};