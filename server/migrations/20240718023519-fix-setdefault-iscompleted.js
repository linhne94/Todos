'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('task', 'isCompleted', {
      type: Sequelize.BOOLEAN,
      allowNull: true, // hoặc false nếu bạn muốn bắt buộc
      defaultValue: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('task', 'isCompleted');
  }
};