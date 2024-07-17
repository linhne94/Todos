'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'role', {
      type: Sequelize.STRING,
      allowNull: true, // hoặc false nếu bạn muốn bắt buộc
      default: 'user'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'role');
  }
};