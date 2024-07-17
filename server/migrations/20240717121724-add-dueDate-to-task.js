'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('task', 'dueDate', {
      type: Sequelize.DATE,
      allowNull: false, // hoặc false nếu bạn muốn bắt buộc
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('task', 'dueDate');
  }
};