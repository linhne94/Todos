'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false, // hoặc false nếu bạn muốn bắt buộc
    });

    await queryInterface.addColumn('Users', 'username', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true, // hoặc false nếu bạn muốn bắt buộc
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'age');
  }
};