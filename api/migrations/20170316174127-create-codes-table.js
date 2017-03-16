'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('codes', {
      id: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false,
      },
      redirectUri: Sequelize.STRING,
      userId: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false,
      },
      clientId: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false,
      }
    });

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('codes');
  }
};
